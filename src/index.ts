import localforage from "localforage";

import type { CacheDriver } from "@regions-of-indonesia/client";

type Item = {
  expires: number;
  data: any;
};

const TTL = 7 * 24 * 60 * 60 * 1000;

function isTypeofItem(value: unknown): value is Item {
  return (
    typeof value === "object" &&
    value !== null &&
    value.hasOwnProperty("expires") &&
    typeof (value as Item).expires === "number" &&
    value.hasOwnProperty("data") &&
    typeof (value as Item).data !== "undefined"
  );
}

function isAlive(value: unknown): value is Item {
  return isTypeofItem(value) && new Date().getTime() < value.expires;
}

function expires(ttl: number): number {
  const n = Number(ttl);
  return new Date().getTime() + (isNaN(n) || n < 0 ? TTL : n);
}

type CreateLocalForageDriverOptions = {
  name?: string;
  ttl?: number;
};

function createLocalForageDriver(options: CreateLocalForageDriverOptions = {}): CacheDriver {
  const { name = "regions-of-indonesia", ttl = TTL } = options;

  const instance = localforage.createInstance({ name });

  return {
    async get(key: string) {
      const item = await instance.getItem<Item>(key);
      return isAlive(item) ? item.data : null;
    },
    async set(key: string, value: any) {
      await instance.setItem<Item>(key, { expires: expires(ttl), data: value });
    },
    async delete(key: string) {
      await instance.removeItem(key);
    },
  };
}

export { createLocalForageDriver };
