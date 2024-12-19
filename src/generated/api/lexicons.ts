/**
 * GENERATED CODE - DO NOT MODIFY
 */
import { LexiconDoc, Lexicons } from '@atproto/lexicon'

export const schemaDict = {
  AppNetlifyStellarbskyGetReaction: {
    lexicon: 1,
    id: 'app.netlify.stellarbsky.getReaction',
    defs: {
      main: {
        type: 'query',
        description:
          'Get reaction records which reference a subject (by AT-URI and CID).',
        parameters: {
          type: 'params',
          required: ['uri'],
          properties: {
            uri: {
              type: 'string',
              format: 'at-uri',
              description: 'AT-URI of the subject (eg, a post record).',
            },
            cid: {
              type: 'string',
              format: 'cid',
              description:
                'CID of the subject record (aka, specific version of record), to filter reactions.',
            },
            limit: {
              type: 'integer',
              minimum: 1,
              maximum: 100,
              default: 50,
            },
            cursor: {
              type: 'string',
            },
          },
        },
        output: {
          encoding: 'application/json',
          schema: {
            type: 'object',
            required: ['uri', 'reactions'],
            properties: {
              uri: {
                type: 'string',
                format: 'at-uri',
              },
              cid: {
                type: 'string',
                format: 'cid',
              },
              cursor: {
                type: 'string',
              },
              reactions: {
                type: 'array',
                items: {
                  type: 'ref',
                  ref: 'lex:app.netlify.stellarbsky.getReaction#reaction',
                },
              },
            },
          },
        },
      },
      reaction: {
        type: 'object',
        required: ['subject', 'createdAt', 'emoji', 'actor'],
        properties: {
          subject: {
            type: 'ref',
            ref: 'lex:com.atproto.repo.strongRef',
          },
          createdAt: {
            type: 'string',
            format: 'datetime',
          },
          emoji: {
            type: 'string',
          },
          actor: {
            type: 'ref',
            ref: 'lex:app.bsky.actor.defs#profileView',
          },
        },
      },
    },
  },
  AppNetlifyStellarbskyReaction: {
    lexicon: 1,
    id: 'app.netlify.stellarbsky.reaction',
    defs: {
      main: {
        type: 'record',
        description: 'Record declaring a emoji reaction of a subject content.',
        key: 'tid',
        record: {
          type: 'object',
          required: ['subject', 'createdAt', 'emoji', 'authorDid'],
          properties: {
            subject: {
              type: 'ref',
              ref: 'lex:com.atproto.repo.strongRef',
            },
            createdAt: {
              type: 'string',
              format: 'datetime',
            },
            emoji: {
              type: 'string',
            },
            authorDid: {
              type: 'string',
              format: 'at-identifier',
            },
          },
        },
      },
    },
  },
  ComAtprotoRepoStrongRef: {
    lexicon: 1,
    id: 'com.atproto.repo.strongRef',
    description: 'A URI with a content-hash fingerprint.',
    defs: {
      main: {
        type: 'object',
        required: ['uri', 'cid'],
        properties: {
          uri: {
            type: 'string',
            format: 'at-uri',
          },
          cid: {
            type: 'string',
            format: 'cid',
          },
        },
      },
    },
  },
} as const satisfies Record<string, LexiconDoc>

export const schemas = Object.values(schemaDict)
export const lexicons: Lexicons = new Lexicons(schemas)
export const ids = {
  AppNetlifyStellarbskyGetReaction: 'app.netlify.stellarbsky.getReaction',
  AppNetlifyStellarbskyReaction: 'app.netlify.stellarbsky.reaction',
  ComAtprotoRepoStrongRef: 'com.atproto.repo.strongRef',
}
