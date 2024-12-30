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
        required: ['rkey', 'subject', 'createdAt', 'emoji', 'actor'],
        properties: {
          rkey: {
            type: 'string',
          },
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
          required: ['subject', 'emoji', 'authorDid'],
          properties: {
            subject: {
              type: 'ref',
              ref: 'lex:com.atproto.repo.strongRef',
            },
            emoji: {
              type: 'ref',
              ref: 'lex:blue.moji.collection.item#itemView',
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
  BlueMojiCollectionItem: {
    lexicon: 1,
    id: 'blue.moji.collection.item',
    defs: {
      main: {
        type: 'record',
        description: 'A custom emoji',
        key: 'any',
        record: {
          type: 'object',
          required: ['name', 'createdAt', 'formats'],
          properties: {
            name: {
              type: 'string',
              description: 'Should be in the format :emoji:',
            },
            alt: {
              type: 'string',
            },
            createdAt: {
              type: 'string',
              format: 'datetime',
            },
            formats: {
              type: 'union',
              description: 'Open union to allow for future formats',
              refs: ['lex:blue.moji.collection.item#formats_v0'],
              closed: false,
            },
            adultOnly: {
              type: 'boolean',
              default: false,
            },
            labels: {
              type: 'union',
              description:
                'Self-label values for this emoji. Effectively content warnings.',
              refs: ['lex:com.atproto.label.defs#selfLabels'],
            },
            copyOf: {
              type: 'string',
              format: 'at-uri',
            },
            fallbackText: {
              type: 'string',
              maxLength: 1,
              default: '◌',
            },
          },
        },
      },
      formats_v0: {
        type: 'object',
        properties: {
          original: {
            type: 'blob',
            accept: ['image/*', 'application/lottie+zip'],
            maxSize: 1000000,
          },
          png_128: {
            type: 'ref',
            ref: 'lex:blue.moji.collection.item#blob_v0',
          },
          apng_128: {
            type: 'ref',
            ref: 'lex:blue.moji.collection.item#bytes_v0',
          },
          gif_128: {
            type: 'ref',
            ref: 'lex:blue.moji.collection.item#blob_v0',
          },
          webp_128: {
            type: 'ref',
            ref: 'lex:blue.moji.collection.item#blob_v0',
          },
          lottie: {
            type: 'ref',
            ref: 'lex:blue.moji.collection.item#bytes_v0',
          },
        },
      },
      blob_v0: {
        type: 'blob',
        maxSize: 262144,
        description:
          'Limiting blobs to 256kb because there may be many on page and these get optimised by ImgProxy anyway',
      },
      bytes_v0: {
        type: 'bytes',
        maxLength: 65536,
        description: '64kb should be enough for anybody',
      },
      itemView: {
        type: 'object',
        required: ['name', 'formats'],
        properties: {
          name: {
            type: 'string',
          },
          alt: {
            type: 'string',
          },
          createdAt: {
            type: 'string',
            format: 'datetime',
          },
          formats: {
            type: 'ref',
            ref: 'lex:blue.moji.collection.item#formats_v0',
          },
          adultOnly: {
            type: 'boolean',
            default: false,
          },
        },
      },
    },
  },
  BlueMojiCollectionListCollection: {
    lexicon: 1,
    id: 'blue.moji.collection.listCollection',
    defs: {
      main: {
        type: 'query',
        description:
          'List a range of Bluemoji in a repository, matching a specific collection. Requires auth.',
        parameters: {
          type: 'params',
          properties: {
            limit: {
              type: 'integer',
              minimum: 1,
              maximum: 100,
              default: 50,
              description: 'The number of records to return.',
            },
            cursor: {
              type: 'string',
            },
            reverse: {
              type: 'boolean',
              description: 'Flag to reverse the order of the returned records.',
            },
          },
        },
        output: {
          encoding: 'application/json',
          schema: {
            type: 'object',
            required: ['items'],
            properties: {
              cursor: {
                type: 'string',
              },
              items: {
                type: 'array',
                items: {
                  type: 'ref',
                  ref: 'lex:blue.moji.collection.item#itemView',
                },
              },
            },
          },
        },
      },
      itemView: {
        type: 'object',
        required: ['uri', 'record'],
        properties: {
          uri: {
            type: 'string',
            format: 'at-uri',
          },
          record: {
            type: 'ref',
            ref: 'lex:blue.moji.collection.item#itemView',
          },
        },
      },
    },
  },
  BlueMojiCollectionDefs: {
    lexicon: 1,
    id: 'blue.moji.collection.defs',
    defs: {
      collectionView: {
        type: 'object',
        required: ['uri', 'cid', 'creator', 'name', 'indexedAt'],
        properties: {
          uri: {
            type: 'string',
            format: 'at-uri',
          },
          cid: {
            type: 'string',
            format: 'cid',
          },
          creator: {
            type: 'ref',
            ref: 'lex:app.bsky.actor.defs#profileView',
          },
          name: {
            type: 'string',
            maxLength: 64,
            minLength: 1,
          },
          description: {
            type: 'string',
            maxGraphemes: 300,
            maxLength: 3000,
          },
          descriptionFacets: {
            type: 'array',
            items: {
              type: 'ref',
              ref: 'lex:app.bsky.richtext.facet',
            },
          },
          avatar: {
            type: 'string',
            format: 'uri',
          },
          collectionItemCount: {
            type: 'integer',
            minimum: 0,
          },
          labels: {
            type: 'array',
            items: {
              type: 'ref',
              ref: 'lex:com.atproto.label.defs#label',
            },
          },
          indexedAt: {
            type: 'string',
            format: 'datetime',
          },
        },
      },
    },
  },
  BlueMojiCollectionPutItem: {
    lexicon: 1,
    id: 'blue.moji.collection.putItem',
    defs: {
      main: {
        type: 'procedure',
        description:
          'Write a Bluemoji record, creating or updating it as needed. Requires auth, implemented by AppView.',
        input: {
          encoding: 'application/json',
          schema: {
            type: 'object',
            required: ['repo', 'item'],
            properties: {
              repo: {
                type: 'string',
                format: 'at-identifier',
                description:
                  'The handle or DID of the repo (aka, current account).',
              },
              validate: {
                type: 'boolean',
                default: true,
                description:
                  "Can be set to 'false' to skip Lexicon schema validation of record data.",
              },
              item: {
                type: 'ref',
                ref: 'lex:blue.moji.collection.item#itemView',
              },
            },
          },
        },
        output: {
          encoding: 'application/json',
          schema: {
            type: 'object',
            required: ['uri'],
            properties: {
              uri: {
                type: 'string',
                format: 'at-uri',
              },
            },
          },
        },
        errors: [],
      },
    },
  },
  BlueMojiCollectionGetItem: {
    lexicon: 1,
    id: 'blue.moji.collection.getItem',
    defs: {
      main: {
        type: 'query',
        description: 'Get a single emoji from a repository. Requires auth.',
        parameters: {
          type: 'params',
          required: ['repo', 'name'],
          properties: {
            repo: {
              type: 'string',
              format: 'at-identifier',
              description: 'The handle or DID of the repo.',
            },
            name: {
              type: 'string',
              description: 'The Bluemoji alias/rkey.',
            },
          },
        },
        output: {
          encoding: 'application/json',
          schema: {
            type: 'object',
            required: ['uri', 'item'],
            properties: {
              uri: {
                type: 'string',
                format: 'at-uri',
              },
              item: {
                type: 'ref',
                ref: 'lex:blue.moji.collection.item#itemView',
              },
            },
          },
        },
      },
    },
  },
  BlueMojiCollectionSaveToCollection: {
    lexicon: 1,
    id: 'blue.moji.collection.saveToCollection',
    defs: {
      main: {
        type: 'procedure',
        description: 'Copy a single emoji from another repo. Requires auth.',
        input: {
          encoding: 'application/json',
          schema: {
            type: 'object',
            required: ['source', 'name'],
            properties: {
              source: {
                type: 'string',
                format: 'at-identifier',
                description: 'The handle or DID of the repo to copy from.',
              },
              name: {
                type: 'string',
                description: 'The source Bluemoji name/rkey.',
                maxLength: 15,
              },
              renameTo: {
                type: 'string',
                description:
                  "The alias to save the Bluemoji to in the current logged-in user's repo.",
              },
            },
          },
        },
        output: {
          encoding: 'application/json',
          schema: {
            type: 'object',
            required: ['uri', 'item'],
            properties: {
              uri: {
                type: 'string',
                format: 'at-uri',
              },
              item: {
                type: 'ref',
                ref: 'lex:blue.moji.collection.item#itemView',
              },
            },
          },
        },
        errors: [
          {
            name: 'EmojiNotFound',
            description:
              'Indicates the named Bluemoji was not found in the source repo.',
          },
          {
            name: 'DestinationExists',
            description:
              'Indicates another Bluemoji with the same name already exists in the source repo. Set renameTo to rename.',
          },
        ],
      },
    },
  },
  BlueMojiPacksPack: {
    lexicon: 1,
    id: 'blue.moji.packs.pack',
    defs: {
      main: {
        type: 'record',
        description: 'A shareable Bluemoji pack',
        key: 'tid',
        record: {
          type: 'object',
          required: ['name', 'createdAt'],
          properties: {
            name: {
              type: 'string',
              maxLength: 64,
              minLength: 1,
            },
            description: {
              type: 'string',
              maxGraphemes: 300,
              maxLength: 3000,
            },
            descriptionFacets: {
              type: 'array',
              items: {
                type: 'ref',
                ref: 'lex:blue.moji.richtext.facet',
              },
            },
            icon: {
              type: 'blob',
              accept: ['image/png', 'image/jpeg'],
              maxSize: 1000000,
            },
            adultOnly: {
              type: 'boolean',
              default: false,
            },
            createdAt: {
              type: 'string',
              format: 'datetime',
            },
            labels: {
              type: 'union',
              description:
                'Self-label values for this emoji. Effectively content warnings.',
              refs: ['lex:com.atproto.label.defs#selfLabels'],
            },
          },
        },
      },
    },
  },
  BlueMojiPacksDefs: {
    lexicon: 1,
    id: 'blue.moji.packs.defs',
    defs: {
      packViewBasic: {
        type: 'object',
        required: ['uri', 'cid', 'name'],
        properties: {
          uri: {
            type: 'string',
            format: 'at-uri',
          },
          cid: {
            type: 'string',
            format: 'cid',
          },
          name: {
            type: 'string',
            maxLength: 64,
            minLength: 1,
          },
          description: {
            type: 'string',
            maxGraphemes: 300,
            maxLength: 3000,
          },
          descriptionFacets: {
            type: 'array',
            items: {
              type: 'ref',
              ref: 'lex:blue.moji.richtext.facet',
            },
          },
          avatar: {
            type: 'string',
            format: 'uri',
          },
          itemCount: {
            type: 'integer',
            minimum: 0,
          },
          labels: {
            type: 'array',
            items: {
              type: 'ref',
              ref: 'lex:com.atproto.label.defs#label',
            },
          },
          viewer: {
            type: 'ref',
            ref: 'lex:blue.moji.packs.defs#packViewerState',
          },
          indexedAt: {
            type: 'string',
            format: 'datetime',
          },
        },
      },
      packView: {
        type: 'object',
        required: ['uri', 'cid', 'creator', 'name', 'indexedAt'],
        properties: {
          uri: {
            type: 'string',
            format: 'at-uri',
          },
          cid: {
            type: 'string',
            format: 'cid',
          },
          creator: {
            type: 'ref',
            ref: 'lex:app.bsky.actor.defs#profileView',
          },
          name: {
            type: 'string',
            maxLength: 64,
            minLength: 1,
          },
          description: {
            type: 'string',
            maxGraphemes: 300,
            maxLength: 3000,
          },
          descriptionFacets: {
            type: 'array',
            items: {
              type: 'ref',
              ref: 'lex:app.bsky.richtext.facet',
            },
          },
          avatar: {
            type: 'string',
            format: 'uri',
          },
          packItemCount: {
            type: 'integer',
            minimum: 0,
          },
          labels: {
            type: 'array',
            items: {
              type: 'ref',
              ref: 'lex:com.atproto.label.defs#label',
            },
          },
          viewer: {
            type: 'ref',
            ref: 'lex:blue.moji.packs.defs#packViewerState',
          },
          indexedAt: {
            type: 'string',
            format: 'datetime',
          },
        },
      },
      packItemView: {
        type: 'object',
        required: ['uri', 'subject'],
        properties: {
          uri: {
            type: 'string',
            format: 'at-uri',
          },
          subject: {
            type: 'ref',
            ref: 'lex:blue.moji.collection.item#itemView',
          },
        },
      },
      packViewerState: {
        type: 'object',
        properties: {
          savedToCollection: {
            type: 'boolean',
          },
        },
      },
    },
  },
  BlueMojiPacksPackitem: {
    lexicon: 1,
    id: 'blue.moji.packs.packitem',
    defs: {
      main: {
        type: 'record',
        description:
          "Record representing a Bluemoji's inclusion in a specific pack. The AppView will ignore duplicate item records.",
        key: 'tid',
        record: {
          type: 'object',
          required: ['subject', 'pack', 'createdAt'],
          properties: {
            subject: {
              type: 'string',
              format: 'at-uri',
              description:
                'Reference (AT-URI) to the Bluemoji item record (blue.moji.collection.item).',
            },
            pack: {
              type: 'string',
              format: 'at-uri',
              description:
                'Reference (AT-URI) to the pack record (blue.moji.packs.pack).',
            },
            createdAt: {
              type: 'string',
              format: 'datetime',
            },
          },
        },
      },
    },
  },
  BlueMojiPacksGetPack: {
    lexicon: 1,
    id: 'blue.moji.packs.getPack',
    defs: {
      main: {
        type: 'query',
        description:
          "Gets a 'view' (with additional context) of a specified pack.",
        parameters: {
          type: 'params',
          required: ['pack'],
          properties: {
            pack: {
              type: 'string',
              format: 'at-uri',
              description: 'Reference (AT-URI) of the pack record to hydrate.',
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
            required: ['pack', 'items'],
            properties: {
              cursor: {
                type: 'string',
              },
              pack: {
                type: 'ref',
                ref: 'lex:blue.moji.packs.defs#packView',
              },
              items: {
                type: 'array',
                items: {
                  type: 'ref',
                  ref: 'lex:blue.moji.packs.defs#packItemView',
                },
              },
            },
          },
        },
      },
    },
  },
  BlueMojiPacksGetActorPacks: {
    lexicon: 1,
    id: 'blue.moji.packs.getActorPacks',
    defs: {
      main: {
        type: 'query',
        description: 'Get a list of Bluemoji packs created by the actor.',
        parameters: {
          type: 'params',
          required: ['actor'],
          properties: {
            actor: {
              type: 'string',
              format: 'at-identifier',
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
            required: ['packs'],
            properties: {
              cursor: {
                type: 'string',
              },
              packs: {
                type: 'array',
                items: {
                  type: 'ref',
                  ref: 'lex:blue.moji.packs.defs#packViewBasic',
                },
              },
            },
          },
        },
      },
    },
  },
  BlueMojiPacksGetPacks: {
    lexicon: 1,
    id: 'blue.moji.packs.getPacks',
    defs: {
      main: {
        type: 'query',
        description: 'Get views for a list of Bluemoji packs.',
        parameters: {
          type: 'params',
          required: ['uris'],
          properties: {
            uris: {
              type: 'array',
              items: {
                type: 'string',
                format: 'at-uri',
              },
              maxLength: 25,
            },
          },
        },
        output: {
          encoding: 'application/json',
          schema: {
            type: 'object',
            required: ['packs'],
            properties: {
              packs: {
                type: 'array',
                items: {
                  type: 'ref',
                  ref: 'lex:blue.moji.packs.defs#packViewBasic',
                },
              },
            },
          },
        },
      },
    },
  },
  BlueMojiRichtextFacet: {
    lexicon: 1,
    id: 'blue.moji.richtext.facet',
    defs: {
      main: {
        type: 'object',
        required: ['did', 'name', 'formats'],
        properties: {
          did: {
            type: 'string',
            description: 'DID of the user posting the Bluemoji',
          },
          name: {
            type: 'string',
            description: 'Name of the Bluemoji in :emoji: format',
          },
          alt: {
            type: 'string',
          },
          adultOnly: {
            type: 'boolean',
            default: false,
          },
          labels: {
            type: 'union',
            description:
              'Self-label values for this emoji. Effectively content warnings.',
            refs: ['lex:com.atproto.label.defs#selfLabels'],
          },
          formats: {
            type: 'union',
            refs: ['lex:blue.moji.richtext.facet#formats_v0'],
            closed: false,
          },
        },
      },
      formats_v0: {
        type: 'object',
        description:
          'On the facet, only the CID is provided as this can be combined with the DID to create CDN URLs for non-animated blobs. For APNG and dotLottie, raw Bytes are served and require a com.atproto.repo.getRecord roundtrip on render so are marked with a boolean',
        properties: {
          png_128: {
            type: 'string',
            format: 'cid',
          },
          webp_128: {
            type: 'string',
            format: 'cid',
          },
          gif_128: {
            type: 'string',
            format: 'cid',
          },
          apng_128: {
            type: 'boolean',
            default: false,
          },
          lottie: {
            type: 'boolean',
            default: false,
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
  BlueMojiCollectionItem: 'blue.moji.collection.item',
  BlueMojiCollectionListCollection: 'blue.moji.collection.listCollection',
  BlueMojiCollectionDefs: 'blue.moji.collection.defs',
  BlueMojiCollectionPutItem: 'blue.moji.collection.putItem',
  BlueMojiCollectionGetItem: 'blue.moji.collection.getItem',
  BlueMojiCollectionSaveToCollection: 'blue.moji.collection.saveToCollection',
  BlueMojiPacksPack: 'blue.moji.packs.pack',
  BlueMojiPacksDefs: 'blue.moji.packs.defs',
  BlueMojiPacksPackitem: 'blue.moji.packs.packitem',
  BlueMojiPacksGetPack: 'blue.moji.packs.getPack',
  BlueMojiPacksGetActorPacks: 'blue.moji.packs.getActorPacks',
  BlueMojiPacksGetPacks: 'blue.moji.packs.getPacks',
  BlueMojiRichtextFacet: 'blue.moji.richtext.facet',
  ComAtprotoRepoStrongRef: 'com.atproto.repo.strongRef',
}
