/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { XrpcClient, FetchHandler, FetchHandlerOptions } from '@atproto/xrpc'
import { schemas } from './lexicons'
import { CID } from 'multiformats/cid'
import * as AppNetlifyStellarbskyGetReaction from './types/app/netlify/stellarbsky/getReaction'
import * as AppNetlifyStellarbskyReaction from './types/app/netlify/stellarbsky/reaction'
import * as ComAtprotoRepoStrongRef from './types/com/atproto/repo/strongRef'

export * as AppNetlifyStellarbskyGetReaction from './types/app/netlify/stellarbsky/getReaction'
export * as AppNetlifyStellarbskyReaction from './types/app/netlify/stellarbsky/reaction'
export * as ComAtprotoRepoStrongRef from './types/com/atproto/repo/strongRef'

export class AtpBaseClient extends XrpcClient {
  app: AppNS
  com: ComNS

  constructor(options: FetchHandler | FetchHandlerOptions) {
    super(options, schemas)
    this.app = new AppNS(this)
    this.com = new ComNS(this)
  }

  /** @deprecated use `this` instead */
  get xrpc(): XrpcClient {
    return this
  }
}

export class AppNS {
  _client: XrpcClient
  netlify: AppNetlifyNS

  constructor(client: XrpcClient) {
    this._client = client
    this.netlify = new AppNetlifyNS(client)
  }
}

export class AppNetlifyNS {
  _client: XrpcClient
  stellarbsky: AppNetlifyStellarbskyNS

  constructor(client: XrpcClient) {
    this._client = client
    this.stellarbsky = new AppNetlifyStellarbskyNS(client)
  }
}

export class AppNetlifyStellarbskyNS {
  _client: XrpcClient
  reaction: ReactionRecord

  constructor(client: XrpcClient) {
    this._client = client
    this.reaction = new ReactionRecord(client)
  }

  getReaction(
    params?: AppNetlifyStellarbskyGetReaction.QueryParams,
    opts?: AppNetlifyStellarbskyGetReaction.CallOptions,
  ): Promise<AppNetlifyStellarbskyGetReaction.Response> {
    return this._client.call(
      'app.netlify.stellarbsky.getReaction',
      params,
      undefined,
      opts,
    )
  }
}

export class ReactionRecord {
  _client: XrpcClient

  constructor(client: XrpcClient) {
    this._client = client
  }

  async list(
    params: Omit<ComAtprotoRepoListRecords.QueryParams, 'collection'>,
  ): Promise<{
    cursor?: string
    records: { uri: string; value: AppNetlifyStellarbskyReaction.Record }[]
  }> {
    const res = await this._client.call('com.atproto.repo.listRecords', {
      collection: 'app.netlify.stellarbsky.reaction',
      ...params,
    })
    return res.data
  }

  async get(
    params: Omit<ComAtprotoRepoGetRecord.QueryParams, 'collection'>,
  ): Promise<{
    uri: string
    cid: string
    value: AppNetlifyStellarbskyReaction.Record
  }> {
    const res = await this._client.call('com.atproto.repo.getRecord', {
      collection: 'app.netlify.stellarbsky.reaction',
      ...params,
    })
    return res.data
  }

  async create(
    params: Omit<
      ComAtprotoRepoCreateRecord.InputSchema,
      'collection' | 'record'
    >,
    record: AppNetlifyStellarbskyReaction.Record,
    headers?: Record<string, string>,
  ): Promise<{ uri: string; cid: string }> {
    record.$type = 'app.netlify.stellarbsky.reaction'
    const res = await this._client.call(
      'com.atproto.repo.createRecord',
      undefined,
      { collection: 'app.netlify.stellarbsky.reaction', ...params, record },
      { encoding: 'application/json', headers },
    )
    return res.data
  }

  async delete(
    params: Omit<ComAtprotoRepoDeleteRecord.InputSchema, 'collection'>,
    headers?: Record<string, string>,
  ): Promise<void> {
    await this._client.call(
      'com.atproto.repo.deleteRecord',
      undefined,
      { collection: 'app.netlify.stellarbsky.reaction', ...params },
      { headers },
    )
  }
}

export class ComNS {
  _client: XrpcClient
  atproto: ComAtprotoNS

  constructor(client: XrpcClient) {
    this._client = client
    this.atproto = new ComAtprotoNS(client)
  }
}

export class ComAtprotoNS {
  _client: XrpcClient
  repo: ComAtprotoRepoNS

  constructor(client: XrpcClient) {
    this._client = client
    this.repo = new ComAtprotoRepoNS(client)
  }
}

export class ComAtprotoRepoNS {
  _client: XrpcClient

  constructor(client: XrpcClient) {
    this._client = client
  }
}
