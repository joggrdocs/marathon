import * as schema from '../schema';

describe('validate', () => {
  it('returns a proper result for a valid schema', () => {
    const validate = schema.createValidate({});
    expect(validate({})).toEqual({
      errors: null,
      schema: {},
      valid: true
    });
  });

  it('returns a proper result for a (simple) valid schema', () => {
    const validate = schema.createValidate({ type: 'string' });
    expect(validate({})).toEqual({
      errors: [
        {
          instancePath: '',
          keyword: 'type',
          message: 'must be string',
          params: { type: 'string' },
          schemaPath: '#/type'
        }
      ],
      schema: { type: 'string' },
      valid: false
    });
  });

  it('returns a proper result for a (complex) valid schema', () => {
    const validate = schema.createValidate({
      type: 'object',
      properties: {
        name: { type: 'string' }
      }
    });

    expect(validate({ name: 2 })).toEqual({
      errors: [
        {
          instancePath: '/name',
          keyword: 'type',
          message: 'must be string',
          params: { type: 'string' },
          schemaPath: '#/properties/name/type'
        }
      ],
      schema: {
        type: 'object',
        properties: {
          name: { type: 'string' }
        }
      },
      valid: false
    });
  });
});

describe('assert', () => {
  it('throws an error when the data is invalid', () => {
    const assert = schema.createAssertion({ type: 'string' }, 'test');
    expect(() => assert({})).toThrow(
      new schema.SchemaError('test', [
        {
          instancePath: '',
          keyword: 'type',
          message: 'must be string',
          params: { type: 'string' },
          schemaPath: '#/type'
        }
      ])
    );
  });

  it('handles an unnamed schema', () => {
    const assert = schema.createAssertion({ type: 'number' });
    expect(() => assert({})).toThrow('Invalid schema: Unknown Schema');
  });

  it('does not throw an error when the data is valid', () => {
    const assert = schema.createAssertion({}, 'test');
    expect(() => assert({})).not.toThrow();
  });
});
