import Ajv, { ErrorObject as AjvErrorObject } from 'ajv';
import { JSONSchema7 } from 'json-schema-to-ts';

/*
|==========================================================================
| Schema
|==========================================================================
|
| Schema validation and assertion wrapper for Ajv.
|
*/

/*
|------------------
| Utils
|------------------
*/

function createSchemaAjvValidator(schema: JSONSchema7) {
  const ajv = new Ajv();
  return ajv.compile(schema);
}

/*
|----------------------------------
| Validate
|----------------------------------
|
| Creates a validation function that returns a ValidationResult, based on the schema and data.
|
*/

export interface ValidationResult<J extends JSONSchema7, T = boolean> {
  schema: J;
  valid: T;
  errors: T extends true ? null : AjvErrorObject[];
}

export function createValidate<J extends JSONSchema7>(schema: J): (data: unknown) => ValidationResult<J> {
  return (data: unknown) => {
    const validate = createSchemaAjvValidator(schema);

    if (!validate(data)) {
      return {
        schema,
        valid: false,
        errors: validate.errors as AjvErrorObject[]
      };
    } else {
      return {
        schema,
        valid: true,
        errors: null
      };
    }
  };
}

/*
|----------------------------------
| Assert
|----------------------------------
|
| Creates an assertion function that throws an error if the data does not match the schema.
|
*/

export class SchemaError extends Error {
  public errors: AjvErrorObject[];

  constructor(name: string, errors: AjvErrorObject[]) {
    super(`Invalid schema: ${name}`);
    this.errors = errors;
  }
}

export function createAssertion(schema: JSONSchema7, name?: string) {
  return (data: unknown) => {
    const validate = createSchemaAjvValidator(schema);
    if (!validate(data)) {
      throw new SchemaError(name ?? 'Unknown Schema', validate.errors as AjvErrorObject[]);
    }
  };
}
