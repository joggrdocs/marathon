export function createSchemaError(name: string): Error {
  return new Error(`Invalid schema: '${name}'`);
}
