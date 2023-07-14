import { FromSchema } from 'json-schema-to-ts';
import tempo from '@joggr/tempo';

import createSchemaValidator from '../schemaValidator';
import * as errors from '../errors';

const JsonSchema = {
  type: 'object',
  required: ['title', 'overview', 'steps'],
  properties: {
    title: { type: 'string' },
    overview: { type: 'string' },
    steps: {
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
  title: 'How to make a basic guide',
  overview: 'This is a basic guide.',
  steps: [
    {
      title: 'Step 1',
      content: 'This is step 1.'
    },
    {
      title: 'Step 2',
      content: 'This is step 2.'
    },
    {
      title: 'Step 3',
      content: 'This is step 3.'
    }
  ],
  requirements: [
    {
      title: 'Step 1',
      content: 'This is step 1.'
    },
    {
      title: 'Step 2',
      content: 'This is step 2.'
    },
    {
      title: 'Step 3',
      content: 'This is step 3.'
    }
  ]
};

export function run(data: Schema) {
  if (!validate(data)) {
    errors.createSchemaError('how-to-guides/dev-environment');
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

