import { FromSchema } from 'json-schema-to-ts';
import tempo from '@joggr/tempo';

import createSchemaValidator from '../schemaValidator';
import * as errors from '../errors';

const JsonSchema = {
  type: 'object',
  required: [
    'name',
    'overview',
    'usage',
    'requirements',
    'inputs',
    'outputs'
  ],
  properties: {
    title: { type: 'string' },
    overview: { type: 'string' },
    usage: {
      oneOf: [
        { type: 'string' },
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
    // assumptions: {
    //   type: 'array',
    //   items: {
    //     type: 'object',
    //     required: ['text'],
    //     properties: {
    //       text: { type: 'string' },
    //       link: { type: 'string' },

    // },
    inputs: {
      type: 'array',
      items: {
        type: 'object',
        required: ['name', 'description', 'type'],
        properties: {
          name: { type: 'string' },
          description: { type: 'string' },
          type: { type: 'string' },
          default: { type: 'string' },
          required: { type: 'boolean' }
        }
      }
    },
    outputs: {
      type: 'array',
      items: {
        type: 'object',
        required: ['name', 'description', 'type'],
        properties: {
          name: { type: 'string' },
          description: { type: 'string' },
          type: { type: 'string' }
        }
      }
    },
    requirements: {
      type: 'array',
      items: {
        type: 'object',
        required: ['text'],
        properties: {
          text: { type: 'string' },
          link: { type: 'string' },
          version: { type: 'string' }
        }
      }
    }
  }
} as const;
export type Schema = FromSchema<typeof JsonSchema>;
export const validate = createSchemaValidator(JsonSchema);

/**
 * Sample data based on: AWS S3 bucket Terraform module
 *
 * @link https://github.com/terraform-aws-modules/terraform-aws-s3-bucket
 */
export const sample = {
  title: 'AWS S3 bucket Terraform module',
  overview: `
Terraform module which creates S3 bucket on AWS with all (or almost all) features provided by Terraform AWS provider.

These features of S3 bucket configurations are supported:

static web-site hosting
access logging
versioning
CORS
lifecycle rules
server-side encryption
object locking
Cross-Region Replication (CRR)
ELB log delivery bucket policy
ALB/NLB log delivery bucket policy
`.trim(),
  usage: [],
  inputs: [],
  outputs: [],

};

export function run(data: Schema) {
  if (!validate(data)) {
    errors.createSchemaError('api-docs/terraform-module');
  }
  const doc = tempo()
    .h1(data.title)
    .paragraph(data.overview);

  if (data.requirements && data.requirements.length > 0) {
    doc.h2('Requirements');
    for (const step of data.steps) {
      doc
        .h3(step.title)
        .paragraph(step.content);
    }
  }

  if (data.steps.length > 0) {
    doc.h2('Steps');
    for (const step of data.steps) {
      doc
        .h3(step.title)
        .paragraph(step.content);
    }
  }

  return doc.toString();
}

