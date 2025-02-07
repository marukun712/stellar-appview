import { DidDocument } from "@atproto/common";
import { createIdResolver, getServiceEndpoint } from "../resolver.js";
import { BlueMojiCollectionItem } from "../../generated/api/index.js";
import { Agent } from "@atproto/api";

export async function getEmojiFromPDS(rkey: string, repo: string) {
  const resolver = createIdResolver();
  const didDoc = await resolver.did.resolve(repo);

  //PDSのURLを取得
  const serviceUrl = getServiceEndpoint(didDoc as DidDocument);

  const service = new Agent(serviceUrl!);

  const emoji = await service.com.atproto.repo.getRecord({
    collection: "blue.moji.collection.item",
    repo: repo,
    rkey: rkey,
  });

  if (
    !BlueMojiCollectionItem.isRecord(emoji) &&
    !BlueMojiCollectionItem.validateRecord(emoji)
  )
    return null;

  return emoji.data.value;
}
