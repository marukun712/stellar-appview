import { Agent } from "@atproto/api";

export async function getProfile(did: string) {
  //public Agentを作成
  const agent = new Agent("https://public.api.bsky.app");

  const profile = await agent.getProfile({ actor: did });

  return profile;
}
