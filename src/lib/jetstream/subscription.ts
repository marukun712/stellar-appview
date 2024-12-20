import { Jetstream } from "@skyware/jetstream";
import { prisma } from "../db/prisma.js";
import { Record } from "../../generated/api/types/app/netlify/stellarbsky/reaction.js";
import WebSocket from "ws";

export const jetstream = new Jetstream({
  ws: WebSocket,
  wantedCollections: ["app.netlify.stellarbsky.reaction"],
});

jetstream.onCreate("app.netlify.stellarbsky.reaction", async (event) => {
  console.log(`New Reaction: ${event.commit.rkey}`);

  const record = event.commit.record as unknown as Record;

  await prisma.reaction.upsert({
    where: {
      rkey: event.commit.rkey,
    },
    update: {
      post_uri: record.subject.uri,
      post_cid: record.subject.cid,
      emoji: record.emoji,
      record: JSON.stringify(event.commit),
      authorDid: record.authorDid,
    },
    create: {
      rkey: event.commit.rkey,
      post_uri: record.subject.uri,
      post_cid: record.subject.cid,
      emoji: record.emoji,
      record: JSON.stringify(event.commit),
      authorDid: record.authorDid,
    },
  });
});

jetstream.onUpdate("app.netlify.stellarbsky.reaction", async (event) => {
  console.log(`Updated Reaction: ${event.commit.rkey}`);

  const record = event.commit.record as unknown as Record;

  await prisma.reaction.upsert({
    where: {
      rkey: event.commit.rkey,
    },
    update: {
      post_uri: record.subject.uri,
      post_cid: record.subject.cid,
      emoji: record.emoji,
      record: JSON.stringify(event.commit),
      authorDid: record.authorDid,
    },
    create: {
      rkey: event.commit.rkey,
      post_uri: record.subject.uri,
      post_cid: record.subject.cid,
      emoji: record.emoji,
      record: JSON.stringify(event.commit),
      authorDid: record.authorDid,
    },
  });
});

jetstream.onDelete("app.netlify.stellarbsky.reaction", async (event) => {
  console.log(`Deleted Reaction: ${event.commit.rkey}`);

  await prisma.reaction.delete({
    where: { rkey: event.commit.rkey },
  });
});
