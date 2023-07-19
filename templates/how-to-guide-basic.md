# How to make add a template to marathon

This is a basic guide, for adding a template to marathon.

## Requirements

- node v20+
- npm v8+

## When do I need this?

Adding a template requires certain guidelines to be followed or the API will not be met. We are not currently enforcing the exposed API but will look to do so in the future.

## Steps

### 1. Create the template file

You will need to create the template file in `src/lib/templates` directory. Make sure to follow any naming patterns such as the `how-to-guides` prefix such (i.e. `how-to-guides-basic.ts`).

### 2. Add the basic layout

Each file requires a JSONSchema object, Schema type, validate function, and sample data object. You can copy the following code snippet to get started.

```javascript
import { FromSchema } from 'json-schema-to-ts';
import tempo, { supportedLanguages } from '@joggr/tempo';

import * as schema from '../schema';

const JsonSchema = {} as const;
export type Schema = FromSchema<typeof JsonSchema>;

export const validate = schema.createValidate<typeof JsonSchema>(JsonSchema);

export const assert = schema.createAssertion(JsonSchema, name);

export const sample = {};

export function run(data: Schema) {
  assert(data);
  
  const doc = tempo();

  return doc.toString();
}
```

### 3. Add unit tests

You will need to add unit tests for the template. You can copy the following code snippet to get started.

#### `src/lib/templates/__tests__/how-to-guide-basic.test.ts`

```javascript
import * as doc from '../how-to-guide-basic'

describe('how-to-guide-basic', () => {
  it('matches snapshot', () => {
    expect(doc.run(doc.sample as doc.Schema)).toMatchSnapshot();
  });
});
```

### 4. Build outputs

You will need to run the build outputs command to output an example markdown template that will be shared. You can run the following command to do so.

```bash
npm run build:outputs
```

## Conclusion

You should now have a basic understanding of how to add a template to marathon. If you have additional questions post and issue on the repo or reach out to the team.