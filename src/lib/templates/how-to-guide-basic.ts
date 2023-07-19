import { FromSchema } from 'json-schema-to-ts';
import tempo, { supportedLanguages } from '@joggr/tempo';

import * as schema from '../schema';

/*
|==========================================================================
| how-to-guide-basic
|==========================================================================
|
| This template is used to generate a basic how-to guide.
|
*/

export const name = 'how-to-guide-basic' as const;

export const JsonSchema = {
  type: 'object',
  required: ['title', 'overview', 'steps'],
  properties: {
    title: {
      description: 'The title of the how-to guide, specifically a one-line description of what the end-user is attempting to accomplish or do (i.e. How to build a React component).',
      type: 'string'
    },
    overview: {
      description: 'A detailed description of the how-to guide, specifically what is the end-user attempting to accomplish or do (i.e. How to build a React component).',
      type: 'string'
    },
    need: {
      description: 'A description of when the user should use this how-to-guide aka when do they "need" it.',
      type: 'string'
    },
    requirements: {
      description: 'A list of requirements that the user must have before they can complete the how-to-guide.',
      type: 'array',
      items: { type: 'string' }
    },
    steps: {
      description: 'A list of steps that the user must complete in order to complete the how-to-guide. This can include code snippets or examples.',
      type: 'array',
      items: {
        type: 'object',
        required: ['title', 'content'],
        properties: {
          title: { type: 'string' },
          content: { type: 'string' },
          code: {
            type: 'object',
            required: ['contents'],
            properties: {
              language: { type: 'string', enum: supportedLanguages },
              contents: { type: 'string' },
              filePath: { type: 'string', nullable: true },
              lineNumbers: {
                nullable: true,
                type: 'object',
                required: ['start', 'end'],
                properties: {
                  start: { type: 'number', minimum: 1 },
                  end: { type: 'number' }
                }
              }
            }
          }
        }
      }
    },
    resources: {
      description: 'A list of resources that the user can use to learn more or that were referenced in the how-to-guide.',
      type: 'array',
      items: {
        type: 'object',
        required: ['title', 'url'],
        properties: {
          title: { type: 'string' },
          url: { type: 'string' }
        }
      }
    },
    conclusion: {
      description: 'A conclusion to the how-to-guide, specifically what the user should have learned or accomplished, and if there are any next steps.',
      type: 'string'
    }
  }
} as const;
export type Data = FromSchema<typeof JsonSchema>;

export const validate = schema.createValidate<typeof JsonSchema>(JsonSchema);

export const assert = schema.createAssertion(JsonSchema, name);

export const sample: Data = {
  title: 'How to make add a template to marathon',
  overview: 'This is a basic guide, for adding a template to marathon.',
  need: 'Adding a template requires certain guidelines to be followed or the API will not be met. We are not currently enforcing the exposed API but will look to do so in the future.',
  steps: [
    {
      title: 'Create the template file',
      content: 'You will need to create the template file in `src/lib/templates` directory. Make sure to follow any naming patterns such as the `how-to-guides` prefix such (i.e. `how-to-guides-basic.ts`).'
    },
    {
      title: 'Add the basic layout',
      content: 'Each file requires a JSONSchema object, Schema type, validate function, and sample data object. You can copy the following code snippet to get started.',
      code: {
        language: 'javascript',
        contents: `
import { FromSchema } from 'json-schema-to-ts';
import tempo, { supportedLanguages } from '@joggr/tempo';

import * as schema from '../schema';

const JsonSchema = {} as const;
export type Data = FromSchema<typeof JsonSchema>;

export const validate = schema.createValidate<typeof JsonSchema>(JsonSchema);

export const assert = schema.createAssertion(JsonSchema, name);

export const sample: Data = {};

export function run(data: Data) {
  assert(data);
  
  const doc = tempo();

  return doc.toString();
}
        `.trim()
      }
    },
    {
      title: 'Add unit tests',
      content: 'You will need to add unit tests for the template. You can copy the following code snippet to get started.',
      code: {
        language: 'javascript',
        filePath: 'src/lib/templates/__tests__/how-to-guide-basic.test.ts',
        contents: `
import * as doc from '../how-to-guide-basic'

describe('how-to-guide-basic', () => {
  it('matches snapshot', () => {
    expect(doc.run(doc.sample as doc.Schema)).toMatchSnapshot();
  });
});
`.trim()
      }
    },
    {
      title: 'Build outputs',
      content: 'You will need to run the build outputs command to output an example markdown template that will be shared. You can run the following command to do so.',
      code: {
        language: 'bash',
        contents: 'npm run build:outputs'
      }
    }
  ],
  resources: [
    {
      title: 'json-schema-to-ts',
      url: 'https://github.com/ThomasAribart/json-schema-to-ts'
    }
  ],
  requirements: [
    'node v20+',
    'npm v8+'
  ],
  conclusion: 'You should now have a basic understanding of how to add a template to marathon. If you have additional questions post and issue on the repo or reach out to the team.'
};

/**
 * Runs the how-to-guide-basic template.
 */
export function run(data: Data) {
  assert(data);

  const doc = tempo()
    .h1(data.title)
    .paragraph(data.overview);

  if (data.requirements && data.requirements.length > 0) {
    doc
      .h2('Requirements')
      .bulletList(data.requirements);
  }

  if (data.need) {
    doc
      .h2('When do I need this?')
      .paragraph(data.need);
  }

  if (data.steps.length > 0) {
    doc.h2('Steps');
    let counter = 1;
    for (const step of data.steps) {
      doc
        .h3(`${counter}. ${step.title}`)
        .paragraph(step.content);

      if (Object.hasOwn(step, 'code')) {
        if (Object.hasOwn(step.code, 'filePath') && typeof step.code.filePath === 'string') {
          doc.h4(txt => txt.code(
            step.code.filePath as string
          ));
        }
        doc.codeBlock(step.code.contents, step.code.language);
      }
      counter++;
    }
  }

  if (data.resources && data.resources.length > 0) {
    doc
      .h2('Resources')
      .bulletList(data.resources.map(resource => {
        return txt => txt.link(resource.title, resource.url);
      }));
  }

  if (data.conclusion) {
    doc
      .h2('Conclusion')
      .paragraph(data.conclusion);
  }

  return doc.toString();
}
