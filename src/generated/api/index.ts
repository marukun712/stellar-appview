/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { XrpcClient, FetchHandler, FetchHandlerOptions } from '@atproto/xrpc'
import { schemas } from './lexicons'
import { CID } from 'multiformats/cid'
import * as AppNetlifyStellarbskyGetReaction from './types/app/netlify/stellarbsky/getReaction'
import * as AppNetlifyStellarbskyReaction from './types/app/netlify/stellarbsky/reaction'
import * as BlueMojiCollectionItem from './types/blue/moji/collection/item'
import * as BlueMojiCollectionListCollection from './types/blue/moji/collection/listCollection'
import * as BlueMojiCollectionDefs from './types/blue/moji/collection/defs'
import * as BlueMojiCollectionPutItem from './types/blue/moji/collection/putItem'
import * as BlueMojiCollectionGetItem from './types/blue/moji/collection/getItem'
import * as BlueMojiCollectionSaveToCollection from './types/blue/moji/collection/saveToCollection'
import * as BlueMojiPacksPack from './types/blue/moji/packs/pack'
import * as BlueMojiPacksDefs from './types/blue/moji/packs/defs'
import * as BlueMojiPacksPackitem from './types/blue/moji/packs/packitem'
import * as BlueMojiPacksGetPack from './types/blue/moji/packs/getPack'
import * as BlueMojiPacksGetActorPacks from './types/blue/moji/packs/getActorPacks'
import * as BlueMojiPacksGetPacks from './types/blue/moji/packs/getPacks'
import * as BlueMojiRichtextFacet from './types/blue/moji/richtext/facet'
import * as ComAtprotoRepoStrongRef from './types/com/atproto/repo/strongRef'

export * as AppNetlifyStellarbskyGetReaction from './types/app/netlify/stellarbsky/getReaction'
export * as AppNetlifyStellarbskyReaction from './types/app/netlify/stellarbsky/reaction'
export * as BlueMojiCollectionItem from './types/blue/moji/collection/item'
export * as BlueMojiCollectionListCollection from './types/blue/moji/collection/listCollection'
export * as BlueMojiCollectionDefs from './types/blue/moji/collection/defs'
export * as BlueMojiCollectionPutItem from './types/blue/moji/collection/putItem'
export * as BlueMojiCollectionGetItem from './types/blue/moji/collection/getItem'
export * as BlueMojiCollectionSaveToCollection from './types/blue/moji/collection/saveToCollection'
export * as BlueMojiPacksPack from './types/blue/moji/packs/pack'
export * as BlueMojiPacksDefs from './types/blue/moji/packs/defs'
export * as BlueMojiPacksPackitem from './types/blue/moji/packs/packitem'
export * as BlueMojiPacksGetPack from './types/blue/moji/packs/getPack'
export * as BlueMojiPacksGetActorPacks from './types/blue/moji/packs/getActorPacks'
export * as BlueMojiPacksGetPacks from './types/blue/moji/packs/getPacks'
export * as BlueMojiRichtextFacet from './types/blue/moji/richtext/facet'
export * as ComAtprotoRepoStrongRef from './types/com/atproto/repo/strongRef'

export class AtpBaseClient extends XrpcClient {
  app: AppNS
  blue: BlueNS
  com: ComNS

  constructor(options: FetchHandler | FetchHandlerOptions) {
    super(options, schemas)
    this.app = new AppNS(this)
    this.blue = new BlueNS(this)
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

export class BlueNS {
  _client: XrpcClient
  moji: BlueMojiNS

  constructor(client: XrpcClient) {
    this._client = client
    this.moji = new BlueMojiNS(client)
  }
}

export class BlueMojiNS {
  _client: XrpcClient
  collection: BlueMojiCollectionNS
  packs: BlueMojiPacksNS
  richtext: BlueMojiRichtextNS

  constructor(client: XrpcClient) {
    this._client = client
    this.collection = new BlueMojiCollectionNS(client)
    this.packs = new BlueMojiPacksNS(client)
    this.richtext = new BlueMojiRichtextNS(client)
  }
}

export class BlueMojiCollectionNS {
  _client: XrpcClient
  item: ItemRecord

  constructor(client: XrpcClient) {
    this._client = client
    this.item = new ItemRecord(client)
  }

  listCollection(
    params?: BlueMojiCollectionListCollection.QueryParams,
    opts?: BlueMojiCollectionListCollection.CallOptions,
  ): Promise<BlueMojiCollectionListCollection.Response> {
    return this._client.call(
      'blue.moji.collection.listCollection',
      params,
      undefined,
      opts,
    )
  }

  putItem(
    data?: BlueMojiCollectionPutItem.InputSchema,
    opts?: BlueMojiCollectionPutItem.CallOptions,
  ): Promise<BlueMojiCollectionPutItem.Response> {
    return this._client.call(
      'blue.moji.collection.putItem',
      opts?.qp,
      data,
      opts,
    )
  }

  getItem(
    params?: BlueMojiCollectionGetItem.QueryParams,
    opts?: BlueMojiCollectionGetItem.CallOptions,
  ): Promise<BlueMojiCollectionGetItem.Response> {
    return this._client.call(
      'blue.moji.collection.getItem',
      params,
      undefined,
      opts,
    )
  }

  saveToCollection(
    data?: BlueMojiCollectionSaveToCollection.InputSchema,
    opts?: BlueMojiCollectionSaveToCollection.CallOptions,
  ): Promise<BlueMojiCollectionSaveToCollection.Response> {
    return this._client
      .call('blue.moji.collection.saveToCollection', opts?.qp, data, opts)
      .catch((e) => {
        throw BlueMojiCollectionSaveToCollection.toKnownErr(e)
      })
  }
}

export class ItemRecord {
  _client: XrpcClient

  constructor(client: XrpcClient) {
    this._client = client
  }

  async list(
    params: Omit<ComAtprotoRepoListRecords.QueryParams, 'collection'>,
  ): Promise<{
    cursor?: string
    records: { uri: string; value: BlueMojiCollectionItem.Record }[]
  }> {
    const res = await this._client.call('com.atproto.repo.listRecords', {
      collection: 'blue.moji.collection.item',
      ...params,
    })
    return res.data
  }

  async get(
    params: Omit<ComAtprotoRepoGetRecord.QueryParams, 'collection'>,
  ): Promise<{
    uri: string
    cid: string
    value: BlueMojiCollectionItem.Record
  }> {
    const res = await this._client.call('com.atproto.repo.getRecord', {
      collection: 'blue.moji.collection.item',
      ...params,
    })
    return res.data
  }

  async create(
    params: Omit<
      ComAtprotoRepoCreateRecord.InputSchema,
      'collection' | 'record'
    >,
    record: BlueMojiCollectionItem.Record,
    headers?: Record<string, string>,
  ): Promise<{ uri: string; cid: string }> {
    record.$type = 'blue.moji.collection.item'
    const res = await this._client.call(
      'com.atproto.repo.createRecord',
      undefined,
      { collection: 'blue.moji.collection.item', ...params, record },
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
      { collection: 'blue.moji.collection.item', ...params },
      { headers },
    )
  }
}

export class BlueMojiPacksNS {
  _client: XrpcClient
  pack: PackRecord
  packitem: PackitemRecord

  constructor(client: XrpcClient) {
    this._client = client
    this.pack = new PackRecord(client)
    this.packitem = new PackitemRecord(client)
  }

  getPack(
    params?: BlueMojiPacksGetPack.QueryParams,
    opts?: BlueMojiPacksGetPack.CallOptions,
  ): Promise<BlueMojiPacksGetPack.Response> {
    return this._client.call('blue.moji.packs.getPack', params, undefined, opts)
  }

  getActorPacks(
    params?: BlueMojiPacksGetActorPacks.QueryParams,
    opts?: BlueMojiPacksGetActorPacks.CallOptions,
  ): Promise<BlueMojiPacksGetActorPacks.Response> {
    return this._client.call(
      'blue.moji.packs.getActorPacks',
      params,
      undefined,
      opts,
    )
  }

  getPacks(
    params?: BlueMojiPacksGetPacks.QueryParams,
    opts?: BlueMojiPacksGetPacks.CallOptions,
  ): Promise<BlueMojiPacksGetPacks.Response> {
    return this._client.call(
      'blue.moji.packs.getPacks',
      params,
      undefined,
      opts,
    )
  }
}

export class PackRecord {
  _client: XrpcClient

  constructor(client: XrpcClient) {
    this._client = client
  }

  async list(
    params: Omit<ComAtprotoRepoListRecords.QueryParams, 'collection'>,
  ): Promise<{
    cursor?: string
    records: { uri: string; value: BlueMojiPacksPack.Record }[]
  }> {
    const res = await this._client.call('com.atproto.repo.listRecords', {
      collection: 'blue.moji.packs.pack',
      ...params,
    })
    return res.data
  }

  async get(
    params: Omit<ComAtprotoRepoGetRecord.QueryParams, 'collection'>,
  ): Promise<{ uri: string; cid: string; value: BlueMojiPacksPack.Record }> {
    const res = await this._client.call('com.atproto.repo.getRecord', {
      collection: 'blue.moji.packs.pack',
      ...params,
    })
    return res.data
  }

  async create(
    params: Omit<
      ComAtprotoRepoCreateRecord.InputSchema,
      'collection' | 'record'
    >,
    record: BlueMojiPacksPack.Record,
    headers?: Record<string, string>,
  ): Promise<{ uri: string; cid: string }> {
    record.$type = 'blue.moji.packs.pack'
    const res = await this._client.call(
      'com.atproto.repo.createRecord',
      undefined,
      { collection: 'blue.moji.packs.pack', ...params, record },
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
      { collection: 'blue.moji.packs.pack', ...params },
      { headers },
    )
  }
}

export class PackitemRecord {
  _client: XrpcClient

  constructor(client: XrpcClient) {
    this._client = client
  }

  async list(
    params: Omit<ComAtprotoRepoListRecords.QueryParams, 'collection'>,
  ): Promise<{
    cursor?: string
    records: { uri: string; value: BlueMojiPacksPackitem.Record }[]
  }> {
    const res = await this._client.call('com.atproto.repo.listRecords', {
      collection: 'blue.moji.packs.packitem',
      ...params,
    })
    return res.data
  }

  async get(
    params: Omit<ComAtprotoRepoGetRecord.QueryParams, 'collection'>,
  ): Promise<{
    uri: string
    cid: string
    value: BlueMojiPacksPackitem.Record
  }> {
    const res = await this._client.call('com.atproto.repo.getRecord', {
      collection: 'blue.moji.packs.packitem',
      ...params,
    })
    return res.data
  }

  async create(
    params: Omit<
      ComAtprotoRepoCreateRecord.InputSchema,
      'collection' | 'record'
    >,
    record: BlueMojiPacksPackitem.Record,
    headers?: Record<string, string>,
  ): Promise<{ uri: string; cid: string }> {
    record.$type = 'blue.moji.packs.packitem'
    const res = await this._client.call(
      'com.atproto.repo.createRecord',
      undefined,
      { collection: 'blue.moji.packs.packitem', ...params, record },
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
      { collection: 'blue.moji.packs.packitem', ...params },
      { headers },
    )
  }
}

export class BlueMojiRichtextNS {
  _client: XrpcClient

  constructor(client: XrpcClient) {
    this._client = client
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
