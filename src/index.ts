import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { ids } from "./generated/api/lexicons.js";
import { prisma } from "./lib/db/prisma.js";
import { jetstream } from "./lib/jetstream/subscription.js";
import { getParams } from "./utils/params.js";
import { Emoji, Reaction } from "@prisma/client";
import {
  BlueMarilStellarGetReactions,
  BlueMarilStellarGetActorReactions,
} from "./generated/api/index.js";
import { Agent } from "@atproto/api";

type ReactionWithEmoji = Reaction & { emoji: Emoji };

const agent = new Agent("https://public.api.bsky.app");

const app = new Hono();
jetstream.start();

app.get("/", (c) => {
  return c.text("This is a Stellar AppView Server.");
});

app.get("/xrpc/" + ids.BlueMarilStellarGetReactions, async (c) => {
  try {
    const uri: string = getParams(c, "uri");
    const cid: string = getParams(c, "cid");
    const cursor: string = getParams(c, "cursor");
    const limit = parseInt(getParams(c, "limit") ?? "20");

    if (!uri) {
      return new Response(
        JSON.stringify({ error: "Missing required parameter: uri" }),
        { status: 400 }
      );
    }

    if (limit < 1 || limit > 100) {
      return new Response(
        JSON.stringify({ error: "Invalid limit: must be between 1 and 100" }),
        {
          status: 400,
        }
      );
    }

    const where: {
      post_uri: string;
      post_cid?: string;
      rkey?: { gt: string };
    } = {
      post_uri: uri,
    };

    if (cid) {
      where.post_cid = cid;
    }

    let reactions: ReactionWithEmoji[];

    if (cursor) {
      reactions = await prisma.reaction.findMany({
        where,
        cursor: { rkey: cursor },
        take: limit + 1,
        skip: 1,
        orderBy: { rkey: "desc" },
        include: { emoji: true },
      });
    } else {
      reactions = await prisma.reaction.findMany({
        where,
        take: limit + 1,
        orderBy: { rkey: "desc" },
        include: { emoji: true },
      });
    }

    const hasMore = reactions.length > limit;

    //余分な1件を削除
    if (hasMore) {
      reactions.pop();
    }

    //リアクションデータの整形
    const transformedReactions: BlueMarilStellarGetReactions.Reaction[] =
      await Promise.all(
        reactions.map(async (reaction) => {
          const profile = await agent.getProfile({ actor: reaction.authorDid });

          return {
            rkey: reaction.rkey,
            subject: { uri: reaction.post_uri, cid: reaction.post_cid },
            createdAt:
              reaction.createdAt?.toISOString() ?? new Date().toISOString(),
            emojiRef: JSON.parse(reaction.record).emoji,
            emoji: JSON.parse(reaction.emoji.record),
            actor: profile.data,
          };
        })
      );

    //レスポンス
    const response: BlueMarilStellarGetReactions.OutputSchema = {
      uri,
      ...(cid && { cid }),
      ...(hasMore && { cursor: reactions[reactions.length - 1].rkey }),
      reactions: transformedReactions,
    };

    return Response.json(response);
  } catch (error) {
    console.error("Err:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
    });
  }
});

app.get("xrpc" + ids.BlueMarilStellarGetActorReactions, async (c) => {
  try {
    const actor = getParams(c, "actor");
    const cursor = getParams(c, "cursor");
    const limit = parseInt(getParams(c, "limit") ?? "20");

    if (!actor) {
      return new Response(
        JSON.stringify({ error: "Missing required parameter: actor" }),
        { status: 400 }
      );
    }

    if (limit < 1 || limit > 100) {
      return new Response(
        JSON.stringify({ error: "Invalid limit: must be between 1 and 100" }),
        { status: 400 }
      );
    }

    let reactions: ReactionWithEmoji[];

    if (cursor) {
      reactions = await prisma.reaction.findMany({
        where: { authorDid: actor },
        cursor: { rkey: cursor },
        take: limit + 1,
        skip: 1,
        orderBy: { rkey: "desc" },
        include: { emoji: true },
      });
    } else {
      reactions = await prisma.reaction.findMany({
        where: { authorDid: actor },
        take: limit + 1,
        orderBy: { rkey: "desc" },
        include: { emoji: true },
      });
    }

    const hasMore = reactions.length > limit;
    if (hasMore) {
      reactions.pop();
    }

    //feedの整形
    const feed = await Promise.all(
      reactions.map(async (reaction) => {
        const profile = await agent.getProfile({ actor: reaction.authorDid });

        return {
          subject: { uri: reaction.post_uri, cid: reaction.post_cid },
          reaction: {
            rkey: reaction.rkey,
            subject: {
              uri: reaction.post_uri,
              cid: reaction.post_cid,
            },
            createdAt:
              reaction.createdAt?.toISOString() ?? new Date().toISOString(),
            emojiRef: JSON.parse(reaction.record).emoji,
            emoji: JSON.parse(reaction.emoji.record),
            actor: profile.data,
          },
        };
      })
    );

    const response: BlueMarilStellarGetActorReactions.OutputSchema = {
      feed,
      ...(hasMore && { cursor: reactions[reactions.length - 1].rkey }),
    };

    return Response.json(response);
  } catch (error) {
    console.error("Err:", error);
    return new Response(
      JSON.stringify({
        error: "Internal server error",
      }),
      { status: 500 }
    );
  }
});

const port = 3000;
console.log(`Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
