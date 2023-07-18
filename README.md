<div>
    <p align="center">
        <img src="/logo.png" align="center" width="240" />
    </p>
    <hr>
    <blockquote align="center">
        "It's a marathon, not a sprint." - Coach Campbell
    </blockquote>
</div>

## Overview

Library of markdown templates for engineering documentation with a programmatic interface.

# Getting Started

## `npm`

```shell
npm install @joggrdocs/marathon
```

## `yarn`

```shell
yarn add @joggrdocs/marathon
```

## Example

```typescript
import fs from 'node:fs/promises';
import marathon from '@joggr/marathon';

const result = marathon.render('api-basic', {
    title: 'This is a title'
});

fs.writeFile('API.md', result);
```
