import {
  CommitCreateEvent,
  CommitUpdateEvent,
  Jetstream,
} from "@skyware/jetstream";
import { prisma } from "../db/prisma.js";
import WebSocket from "ws";
import {
  BlueMarilStellarReaction,
  BlueMojiCollectionItem,
} from "../../generated/api/index.js";

export const jetstream = new Jetstream({
  ws: WebSocket,
  wantedCollections: [
    "blue.maril.stellar.reaction",
    "blue.moji.collection.item",
  ],
});

jetstream.on("open", () => {
  console.log(`jetstream subscription started`);
});

jetstream.on("close", () => {
  console.log(`jetstream subscription closed`);
});

jetstream.on("error", (error) => {
  console.log(error);
});

async function updateReaction(
  event:
    | CommitCreateEvent<"blue.maril.stellar.reaction">
    | CommitUpdateEvent<"blue.maril.stellar.reaction">
) {
  try {
    const record = event.commit.record;

    if (
      BlueMarilStellarReaction.isRecord(record) &&
      BlueMarilStellarReaction.validateRecord(record)
    ) {
      await prisma.reaction.upsert({
        where: {
          rkey: event.commit.rkey,
        },
        update: {
          post_uri: record.subject.uri,
          post_cid: record.subject.cid,
          authorDid: event.did,
          emoji_repo: record.emoji.repo,
          emoji_rkey: record.emoji.rkey,
          record: JSON.stringify(record),
        },
        create: {
          rkey: event.commit.rkey,
          post_uri: record.subject.uri,
          post_cid: record.subject.cid,
          authorDid: event.did,
          emoji_repo: record.emoji.repo,
          emoji_rkey: record.emoji.rkey,
          record: JSON.stringify(record),
        },
      });
    }
  } catch (e) {
    console.log(e);
  }
}

async function updateEmoji(
  event:
    | CommitCreateEvent<"blue.moji.collection.item">
    | CommitUpdateEvent<"blue.moji.collection.item">
) {
  try {
    const record = event.commit.record;
    const author = event.did;

    if (
      BlueMojiCollectionItem.isRecord(record) &&
      BlueMojiCollectionItem.validateRecord(record)
    ) {
      await prisma.emoji.upsert({
        //一つのユーザーリポジトリで絵文字名がユニークになる(はず)(多分)
        where: {
          rkey_repo: {
            rkey: event.commit.rkey,
            repo: author,
          },
        },
        update: {
          record: JSON.stringify(record),
        },
        create: {
          record: JSON.stringify(record),
          rkey: event.commit.rkey,
          repo: author,
        },
      });
    }
  } catch (e) {
    console.log(e);
  }
}

jetstream.onCreate("blue.maril.stellar.reaction", async (event) => {
  console.log(`New Reaction: ${event.commit.rkey}`);

  await updateReaction(event);
});

jetstream.onUpdate("blue.maril.stellar.reaction", async (event) => {
  console.log(`Updated Reaction: ${event.commit.rkey}`);

  await updateReaction(event);
});

jetstream.onDelete("blue.maril.stellar.reaction", async (event) => {
  console.log(`Deleted Reaction: ${event.commit.rkey}`);

  try {
    await prisma.reaction.delete({
      where: { rkey: event.commit.rkey },
    });
  } catch (e) {
    console.log(e);
  }
});

jetstream.onCreate("blue.moji.collection.item", async (event) => {
  console.log(`New Emoji: ${event.commit.rkey}`);

  await updateEmoji(event);
});

jetstream.onUpdate("blue.moji.collection.item", async (event) => {
  console.log(`Updated Emoji: ${event.commit.rkey}`);

  await updateEmoji(event);
});

jetstream.onDelete("blue.moji.collection.item", async (event) => {
  console.log(`Deleted Emoji: ${event.commit.rkey}`);

  try {
    await prisma.emoji.delete({
      where: {
        rkey_repo: {
          rkey: event.commit.rkey,
          repo: event.did,
        },
      },
    });
  } catch (e) {
    console.log(e);
  }
});
