<div>
    <p align="center">
        <img src="/logo.png" align="center" width="240" />
    </p>
    <hr>
    <blockquote align="center">
        "It's a marathon, not a sprint." - <a href="https://en.wikipedia.org/wiki/Matt_Campbell_(American_football_coach)">Coach Campbell</a>
    </blockquote>
</div>

<br>

<p align="center">
  <a href="https://badge.fury.io/js/@joggr%2Fmarathon">
    <img src="https://badge.fury.io/js/@joggr%2Fmarathon.svg" alt="npm version">
  </a>
  <a href="https://github.com/joggrdocs/marathon/actions/workflows/github-code-scanning/codeql">
    <img alt="CodeQL" src="https://github.com/joggrdocs/marathon/actions/workflows/github-code-scanning/codeql/badge.svg">
  </a>
  <a href="https://github.com/joggrdocs/marathon/actions/workflows/npm-publish.yaml">
    <img alt="Publish to npm" src="https://github.com/joggrdocs/marathon/actions/workflows/npm-publish.yaml/badge.svg">
  </a>
  <a href="https://github.com/joggrdocs/marathon/actions/workflows/ci.yaml">
    <img alt="CI" src="https://github.com/joggrdocs/marathon/actions/workflows/ci.yaml/badge.svg">
  </a>
  <br/>
  <a href="https://github.com/standard/semistandard">
    <img alt="JS Semi-standard Style" src="https://img.shields.io/badge/code%20style-semistandard-brightgreen.svg">
  </a>
  <a href="https://github.com/prettier/prettier">
    <img alt="Prettier Style" src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square">
  </a>
</p>

## Overview

Library of markdown templates for engineering documentation with a programmatic interface.

# Getting Started

## `npm`

```shell
npm install @joggr/marathon
```

## `yarn`

```shell
yarn add @joggr/marathon
```

## Example

```typescript
import fs from 'node:fs/promises';
import marathon from '@joggr/marathon';

const result = marathon.run('api-basic', {
    title: 'This is a title'
});

fs.writeFile('API.md', result);
```
