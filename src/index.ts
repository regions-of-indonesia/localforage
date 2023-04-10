import localforage from "localforage";

import type { CacheDriver } from "@regions-of-indonesia/client";

type Item = {
  expires: number;
  data: any;
};

const TTL = 7 * 24 * 60 * 60 * 1000;

const isTypeofItem = (value: unknown): value is Item =>
    typeof value === "object" &&
    value !== null &&
    "expires" in (value as any) &&
    typeof (value as any).expires === "number" &&
    "data" in (value as any) &&
    typeof (value as any).data !== "undefined",
  isAlive = (value: unknown): value is Item => isTypeofItem(value) && new Date().getTime() < value.expires,
  expires = (ttl: number): number => {
    const n = Number(ttl);
    return new Date().getTime() + (isNaN(n) || n < 0 ? TTL : n);
  };

type Options = {
  name?: string;
  ttl?: number;
};

const createLocalForageDriver = (options: Options = {}): CacheDriver<Item["data"]> => {
  const { name = "regions-of-indonesia", ttl = TTL } = options,
    instance = localforage.createInstance({ name });

  return {
    async get(key: string) {
      const item = await instance.getItem<Item>(key);
      return isAlive(item) ? item.data : null;
    },
    async set(key: string, value: Item["data"]) {
      await instance.setItem<Item>(key, { expires: expires(ttl), data: value });
    },
    async delete(key: string) {
      await instance.removeItem(key);
    },
  };
};

export type { Options };
export { createLocalForageDriver };
