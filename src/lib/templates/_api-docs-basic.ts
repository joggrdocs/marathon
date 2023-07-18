import { FromSchema } from 'json-schema-to-ts';
import tempo, { } from '@joggr/tempo';

import createSchemaValidator from '../schemaValidator';
import * as errors from '../errors';

const JsonSchema = {
  type: 'object',
  required: ['title', 'overview', 'steps'],
  properties: {
    title: { type: 'string' },
    overview: { type: 'string' },
    install: {
      oneOf: [
        { type: 'string' },
        {
          type: 'object',
          required: ['name', 'description'],
          properties: {
            name: { type: 'string' },
            description: { type: 'string' },
            code: { type: 'string' }
          }
        },
        {
          type: 'array',
          items: {
            type: 'object',
            required: ['name', 'description'],
            properties: {
              name: { type: 'string' },
              description: { type: 'string' },
              code: { type: 'string' }
            }
          }
        }
      ]
    },
    usage: {
      oneOf: [
        { type: 'string' },
        {
          type: 'object',
          required: ['name', 'description'],
          properties: {
            name: { type: 'string' },
            description: { type: 'string' },
            code: { type: 'string' }
          }
        },
        {
          type: 'array',
          items: {
            type: 'object',
            required: ['name', 'description'],
            properties: {
              name: { type: 'string' },
              description: { type: 'string' },
              code: {
                type: 'object',
                required: ['content'],
                properties: {
                  content: { type: 'string' },
                  language: { type: 'string', enum: tempo }
                }
              }
            }
          }
        }
      ]
    },
    inputs: {
      type: 'array',
      items: {
        type: 'object',
        required: ['title', 'content'],
        properties: {
          title: { type: 'string' },
          content: { type: 'string' }
        }
      }
    },
    outputs: {
      type: 'array',
      items: {
        type: 'object',
        required: ['title', 'content'],
        properties: {
          title: { type: 'string' },
          content: { type: 'string' }
        }
      }
    },
    requirements: {
      type: 'array',
      items: {
        type: 'object',
        required: ['title', 'content'],
        properties: {
          title: { type: 'string' },
          content: { type: 'string' }
        }
      }
    }
  }
} as const;
export type Schema = FromSchema<typeof JsonSchema>;
export const validate = createSchemaValidator(JsonSchema);

export const sample = {
  title: 'React',
  overview: 'This is a basic guide.',
  install: 'This is how you get started.',
  usage: [],
  inputs: [],
  outputs: [],
  requirements: []
};

export function run(data: Schema) {
  if (!validate(data)) {
    errors.createSchemaError('api-docs/terraform-module');
  }
  const doc = tempo()
    .h1(data.title)
    .paragraph(data.overview);

  if (data.install) {
    doc.h2('Install');
    if (typeof data.install === 'string') {
      doc.code(data.install);
    } else if (Array.isArray(data.install)) {
      data.install.forEach((step) => {
        doc.h3(step.name);
        doc.paragraph(step.description);
        if (step.code) doc.codeBlock(step.code);
      });
    } else {
      doc.h3(data.install.name);
      doc.paragraph(data.install.description);
      doc.code(data.install.code);
    }
  }
  return doc.toString();
}
