import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { ids } from "./generated/api/lexicons.js";
import { prisma } from "./lib/db/prisma.js";
import { getProfile } from "./lib/actor/getProfile.js";

import { jetstream } from "./lib/jetstream/subscription.js";
import type { Reaction } from "@prisma/client";

const app = new Hono();
jetstream.start();

app.get("/", (c) => {
  return c.text("This is the Stellar AppView Server.");
});

app.get("/xrpc/" + ids.AppNetlifyStellarbskyGetReaction, async (c) => {
  try {
    const uri = c.req.query("uri");
    const cid = c.req.query("cid");
    const cursor = c.req.query("cursor");
    const limit = parseInt(c.req.query("limit") ?? "50");

    if (!uri) {
      return c.json({ error: "Missing required parameter: uri" }, 400);
    }

    if (isNaN(limit) || limit < 1 || limit > 100) {
      return c.json({ error: "Invalid limit: must be between 1 and 100" }, 400);
    }

    const where: any = { uri };
    if (cid) {
      where.cid = cid;
    }

    const take = limit + 1;
    if (cursor) {
      where.id = { gt: cursor };
    }

    const reactions = await prisma.reaction.findMany({
      where,
      take,
      orderBy: { id: "asc" },
    });

    const hasMore = reactions.length > limit;
    if (hasMore) {
      reactions.pop();
    }

    const transformedReactions = await Promise.all(
      reactions.map(async (reaction: Reaction) => {
        const actor = await getProfile(reaction.authorDid);

        return {
          subject: {
            uri: reaction.uri,
            cid: reaction.cid,
          },
          createdAt:
            reaction.createdAt?.toISOString() ?? new Date().toISOString(),
          emoji: reaction.emoji,
          actor,
        };
      })
    );

    const response = {
      uri,
      ...(cid && { cid }),
      ...(hasMore && { cursor: reactions[reactions.length - 1].id }),
      reactions: transformedReactions,
    };

    return c.json(response);
  } catch (error) {
    console.error("Err:", error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

const port = 3000;
console.log(`Server is running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});
