/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { HeadersMap, XRPCError } from '@atproto/xrpc'
import { ValidationResult, BlobRef } from '@atproto/lexicon'
import { isObj, hasProp } from '../../../../util'
import { lexicons } from '../../../../lexicons'
import { CID } from 'multiformats/cid'
import * as ComAtprotoRepoStrongRef from '../../../com/atproto/repo/strongRef'
import * as BlueMarilStellarGetReactions from './getReactions'

export interface QueryParams {
  actor: string
  limit?: number
  cursor?: string
}

export type InputSchema = undefined

export interface OutputSchema {
  cursor?: string
  feed: ActorReaction[]
  [k: string]: unknown
}

export interface CallOptions {
  signal?: AbortSignal
  headers?: HeadersMap
}

export interface Response {
  success: boolean
  headers: HeadersMap
  data: OutputSchema
}

export function toKnownErr(e: any) {
  return e
}

export interface ActorReaction {
  subject: ComAtprotoRepoStrongRef.Main
  reaction: BlueMarilStellarGetReactions.Reaction
  [k: string]: unknown
}

export function isActorReaction(v: unknown): v is ActorReaction {
  return (
    isObj(v) &&
    hasProp(v, '$type') &&
    v.$type === 'blue.maril.stellar.getActorReactions#actorReaction'
  )
}

export function validateActorReaction(v: unknown): ValidationResult {
  return lexicons.validate(
    'blue.maril.stellar.getActorReactions#actorReaction',
    v,
  )
}
