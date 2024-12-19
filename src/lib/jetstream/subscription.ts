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
      id: event.commit.rkey,
    },
    update: {
      emoji: record.emoji,
    },
    create: {
      id: event.commit.rkey,
      uri: record.subject.uri,
      cid: record.subject.cid,
      emoji: record.emoji,
      authorDid: record.authorDid,
    },
  });
});

jetstream.onUpdate("app.netlify.stellarbsky.reaction", async (event) => {
  console.log(`Updated Reaction: ${event.commit.rkey}`);

  const record = event.commit.record as unknown as Record;

  await prisma.reaction.upsert({
    where: {
      id: event.commit.rkey,
    },
    update: {
      emoji: record.emoji,
    },
    create: {
      id: event.commit.rkey,
      uri: record.subject.uri,
      cid: record.subject.cid,
      emoji: record.emoji,
      authorDid: record.authorDid,
    },
  });
});

jetstream.onDelete("app.netlify.stellarbsky.reaction", async (event) => {
  console.log(`Deleted Reaction: ${event.commit.rkey}`);

  await prisma.reaction.delete({
    where: { id: event.commit.rkey },
  });
});
