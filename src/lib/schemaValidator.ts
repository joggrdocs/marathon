import Ajv from 'ajv';
import { JSONSchema7 } from 'json-schema-to-ts';

const ajv = new Ajv();

function createSchemaValidator(schema: JSONSchema7) {
  return ajv.compile(schema);
}

export default createSchemaValidator;
