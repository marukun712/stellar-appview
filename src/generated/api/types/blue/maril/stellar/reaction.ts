/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { ValidationResult, BlobRef } from '@atproto/lexicon'
import { isObj, hasProp } from '../../../../util'
import { lexicons } from '../../../../lexicons'
import { CID } from 'multiformats/cid'
import * as ComAtprotoRepoStrongRef from '../../../com/atproto/repo/strongRef'

export interface Record {
  subject: ComAtprotoRepoStrongRef.Main
  emoji: EmojiRef
  [k: string]: unknown
}

export function isRecord(v: unknown): v is Record {
  return (
    isObj(v) &&
    hasProp(v, '$type') &&
    (v.$type === 'blue.maril.stellar.reaction#main' ||
      v.$type === 'blue.maril.stellar.reaction')
  )
}

export function validateRecord(v: unknown): ValidationResult {
  return lexicons.validate('blue.maril.stellar.reaction#main', v)
}

export interface EmojiRef {
  rkey: string
  repo: string
  [k: string]: unknown
}

export function isEmojiRef(v: unknown): v is EmojiRef {
  return (
    isObj(v) &&
    hasProp(v, '$type') &&
    v.$type === 'blue.maril.stellar.reaction#emojiRef'
  )
}

export function validateEmojiRef(v: unknown): ValidationResult {
  return lexicons.validate('blue.maril.stellar.reaction#emojiRef', v)
}
