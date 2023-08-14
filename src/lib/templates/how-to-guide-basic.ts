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
      description:
        'The title of the how-to guide, specifically a one-line description of what the end-user is attempting to accomplish or do (i.e. How to build a React component).',
      type: 'string'
    },
    overview: {
      description:
        'A detailed description of the how-to guide, specifically what is the end-user attempting to accomplish or do (i.e. How to build a React component).',
      type: 'string'
    },
    need: {
      description:
        'A description of when the user should use this how-to-guide aka when do they "need" it.',
      type: 'string'
    },
    requirements: {
      description:
        'A list of requirements that the user must have before they can complete the how-to-guide.',
      type: 'array',
      items: { type: 'string' }
    },
    steps: {
      description:
        'A list of steps that the user must complete in order to complete the how-to-guide. This can include code snippets or examples.',
      type: 'array',
      items: {
        type: 'object',
        required: ['title', 'content'],
        properties: {
          title: { type: 'string' },
          optional: { type: 'boolean', default: false },
          content: { type: 'string' },
          image: {
            type: 'object',
            required: ['src', 'alt'],
            properties: {
              src: { type: 'string' },
              alt: { type: 'string' }
            }
          },
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
      description:
        'A list of resources that the user can use to learn more or that were referenced in the how-to-guide.',
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
      description:
        'A conclusion to the how-to-guide, specifically what the user should have learned or accomplished, and if there are any next steps.',
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
      content:
        'You will need to create the template file in `src/lib/templates` directory. Make sure to follow any naming patterns such as the `how-to-guides` prefix such (i.e. `how-to-guides-basic.ts`).'
    },
    {
      title: 'Add the basic layout',
      content:
        'Each file requires a JSONSchema object, Schema type, validate function, and sample data object. You can copy the following code snippet to get started.',
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
      content:
        'You will need to add unit tests for the template. You can copy the following code snippet to get started.',
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
      title: 'Grab a coffee',
      optional: true,
      content: 'Cold brew is the best.',
      image: {
        src: 'data:image/jpeg;base64,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',
        alt: 'A cup of coffee.'
      }
    },
    {
      title: 'Build outputs',
      content:
        'You will need to run the build outputs command to output an example markdown template that will be shared. You can run the following command to do so.',
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
  requirements: ['node v20+', 'npm v8+'],
  conclusion:
    'You should now have a basic understanding of how to add a template to marathon. If you have additional questions post and issue on the repo or reach out to the team.'
};

/**
 * Runs the how-to-guide-basic template.
 */
export function run(data: Data) {
  assert(data);

  const doc = tempo().h1(data.title).paragraph(data.overview);

  if (data.requirements && data.requirements.length > 0) {
    doc.h2('Requirements').bulletList(data.requirements);
  }

  if (data.need) {
    doc.h2('When do I need this?').paragraph(data.need);
  }

  if (data.steps.length > 0) {
    doc.h2('Steps');
    let counter = 1;
    for (const step of data.steps) {
      doc
        .h3(`${counter}. ${step.title}${step.optional ? ' (optional)' : ''}`)
        .paragraph(step.content);

      if (
        Object.hasOwn(step, 'code') &&
        step.code &&
        !Object.hasOwn(step, 'image')
      ) {
        if (
          Object.hasOwn(step.code, 'filePath') &&
          typeof step.code.filePath === 'string'
        ) {
          doc.h4(txt => txt.code(step.code.filePath as string));
        }
        doc.codeBlock(step.code.contents, step.code.language);
      } else if (
        Object.hasOwn(step, 'image') &&
        step.image &&
        !Object.hasOwn(step, 'code')
      ) {
        doc.image(step.image.alt, step.image.src);
      }
      counter++;
    }
  }

  if (data.resources && data.resources.length > 0) {
    doc.h2('Resources').bulletList(
      data.resources.map(resource => {
        return txt => txt.link(resource.title, resource.url);
      })
    );
  }

  if (data.conclusion) {
    doc.h2('Conclusion').paragraph(data.conclusion);
  }

  return doc.toString();
}
