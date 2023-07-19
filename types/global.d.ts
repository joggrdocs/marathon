/*
|==========================================================================
| Global Declarations
|==========================================================================
|
| Types that are used globally in the lib should be declared here, i.e. polyfills, utilities that SHOULD be globals etc. 
|
*/

/*
|------------------
| Utils
|------------------
*/

type SetRequired<BaseType, Keys extends keyof BaseType> = BaseType &
  Omit<BaseType, Keys> &
  Required<Pick<BaseType, Keys>>;

/*
|------------------
| Definitions
|------------------
*/

declare global {
  /**
   * Add support for typed Object.hasOwn() to Typescript
   */
  // eslint-disable-next-line no-unused-vars
  interface ObjectConstructor {
    hasOwn<BaseType, Key extends keyof BaseType>(
      record: BaseType,
      key: Key
    ): record is SetRequired<BaseType, Key>;
    hasOwn<Key extends PropertyKey>(
      record: object,
      key: Key
    ): record is { [K in Key]: unknown };
  }
}

// Adding this exports the declaration file which Typescript/CRA can now pickup:
export { };
