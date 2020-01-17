# How to Use

```sh
npm install @lunit/timeout
```

```js
import { timeout } from '@lunit/timeout';

async function mockAPI() {
  await timeout(1000);
  
  return {
    data: 'foo',
  };
}
```