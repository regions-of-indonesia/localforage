import localforage from "localforage";

import type { CacheDriver } from "@regions-of-indonesia/client";

type Item = {
  e: number;
  v: any;
};

const NAME = "regions-of-indonesia";
const TTL = 7 * 24 * 60 * 60 * 1000;

const isTypeofItem = (value: unknown): value is Item =>
  typeof value === "object" &&
  value !== null &&
  "e" in (value as any) &&
  typeof (value as any).e === "number" &&
  "v" in (value as any) &&
  typeof (value as any).v !== "undefined";

const isAlive = (value: unknown): value is Item => isTypeofItem(value) && new Date().getTime() < value.e;

const expires = (ttl: number): number => new Date().getTime() + ttl;

type Options = {
  name?: string;
  ttl?: number;
};

const createLocalForageDriver = (options: Options = {}): CacheDriver<Item["v"]> => {
  const { name = NAME, ttl = TTL } = options;
  const lf = localforage.createInstance({ name });
  const fixedTTL = isNaN(ttl) || ttl < 0 ? TTL : ttl;

  return {
    get: async (key: string) => {
      const item = await lf.getItem<Item>(key);
      return isAlive(item) ? item.v : null;
    },
    set: async (key: string, value: Item["v"]) => {
      await lf.setItem<Item>(key, { e: expires(fixedTTL), v: value });
    },
    del: async (key: string) => {
      await lf.removeItem(key);
    },
  };
};

export type { Options };
export { createLocalForageDriver };
