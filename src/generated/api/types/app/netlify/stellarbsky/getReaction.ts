/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { HeadersMap, XRPCError } from '@atproto/xrpc'
import { ValidationResult, BlobRef } from '@atproto/lexicon'
import { isObj, hasProp } from '../../../../util'
import { lexicons } from '../../../../lexicons'
import { CID } from 'multiformats/cid'
import * as ComAtprotoRepoStrongRef from '../../../com/atproto/repo/strongRef'
import * as AppBskyActorDefs from '../../bsky/actor/defs'

export interface QueryParams {
  /** AT-URI of the subject (eg, a post record). */
  uri: string
  /** CID of the subject record (aka, specific version of record), to filter reactions. */
  cid?: string
  limit?: number
  cursor?: string
}

export type InputSchema = undefined

export interface OutputSchema {
  uri: string
  cid?: string
  cursor?: string
  reactions: Reaction[]
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

export interface Reaction {
  subject: ComAtprotoRepoStrongRef.Main
  createdAt: string
  emoji: string
  actor: AppBskyActorDefs.ProfileView
  [k: string]: unknown
}

export function isReaction(v: unknown): v is Reaction {
  return (
    isObj(v) &&
    hasProp(v, '$type') &&
    v.$type === 'app.netlify.stellarbsky.getReaction#reaction'
  )
}

export function validateReaction(v: unknown): ValidationResult {
  return lexicons.validate('app.netlify.stellarbsky.getReaction#reaction', v)
}
