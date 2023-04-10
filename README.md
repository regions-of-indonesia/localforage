[![cover]][site]

<p align="center">
  <a href="http://www.npmjs.com/package/@regions-of-indonesia/localforage"><img src="https://img.shields.io/npm/v/@regions-of-indonesia/localforage" /></a>
  <a href="https://bundlephobia.com/package/@regions-of-indonesia/localforage"><img src="https://img.shields.io/bundlephobia/minzip/@regions-of-indonesia/localforage" /></a>
</p>

<img src="https://hiiits.deno.dev/hit/regions-of-indonesia/localforage?" width="100%" heigth="10px" />

# Regions of Indonesia LocalForage

Regions of Indonesia [LocalForage](https://localforage.github.io/localForage). LocalForage cache driver for [Javascript client][github:client]

## Types

```typescript
type Options = {
  name?: string;
  ttl?: number;
};
```

## Package

Install

```bash
npm install @regions-of-indonesia/localforage
# or
yarn add @regions-of-indonesia/localforage
# or
pnpm add @regions-of-indonesia/localforage
```

Usage

```typescript
import { create } from "@regions-of-indonesia/client";
import { createLocalForageDriver } from "@regions-of-indonesia/localforage";

const driver = createLocalForageDriver(/* options */);

const client = create({
  middlewares: [cache({ driver })],
});
```

## Support

[![][support:ko-fi-button]][support:ko-fi]

[![][support:trakteer-button]][support:trakteer]

## LICENSE

GPL-3.0

<!-- exteral -->

[cover]: https://raw.githubusercontent.com/regions-of-indonesia/regions-of-indonesia/main/public/cover@2.png?sanitize=true
[logo]: https://raw.githubusercontent.com/regions-of-indonesia/regions-of-indonesia/main/public/logo@2.png?sanitize=true
[site]: https://regions-of-indonesia.netlify.app
[docs]: https://docs-regions-of-indonesia.netlify.app

<!-- github app -->

[github:api]: https://github.com/regions-of-indonesia/api
[github:static-api]: https://github.com/regions-of-indonesia/static-api
[github:site]: https://github.com/regions-of-indonesia/site
[github:docs]: https://github.com/regions-of-indonesia/docs

<!-- github client -->

[github:client]: https://github.com/regions-of-indonesia/client
[github:data]: https://github.com/regions-of-indonesia/data
[github:php-client]: https://github.com/regions-of-indonesia/php-client
[github:dart-client]: https://github.com/regions-of-indonesia/dart-client
[github:python-client]: https://github.com/regions-of-indonesia/python-client

<!-- github library -->

[github:localforage]: https://github.com/regions-of-indonesia/localforage
[github:swr]: https://github.com/regions-of-indonesia/swr
[github:react-query]: https://github.com/regions-of-indonesia/react-query
[github:solid-query]: https://github.com/regions-of-indonesia/solid-query
[github:vue-query]: https://github.com/regions-of-indonesia/vue-query
[github:svelte-query]: https://github.com/regions-of-indonesia/svelte-query

<!-- support -->

[support:ko-fi]: https://ko-fi.com/flamrdevs
[support:ko-fi-button]: https://flamrdevs.vercel.app/ko-fi.png
[support:trakteer]: https://trakteer.id/flamrdevs
[support:trakteer-button]: https://flamrdevs.vercel.app/trakteer.png
[support:ko-fi]: https://ko-fi.com/flamrdevs
[support:ko-fi-button]: https://flamrdevs.vercel.app/ko-fi.png
[support:trakteer]: https://trakteer.id/flamrdevs
[support:trakteer-button]: https://flamrdevs.vercel.app/trakteer.png
