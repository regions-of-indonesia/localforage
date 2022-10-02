import localforage from "localforage";

import type { CacheDriver } from "@regions-of-indonesia/client";

type Item = {
  expires: number;
  data: any;
};

const TTL = 30 * 24 * 60 * 60 * 1000;

function createExpires() {
  return new Date().getTime() + TTL;
}

function isTypeofItem(value: unknown): value is Item {
  return (
    typeof value === "object" &&
    value !== null &&
    value.hasOwnProperty("expires") &&
    typeof (value as any).expires === "number" &&
    value.hasOwnProperty("data") &&
    typeof (value as any).data !== "undefined"
  );
}

function isLive(value: unknown) {
  return isTypeofItem(value) && new Date().getTime() < value.expires;
}

type CreateLocalForageDriverOptions = {
  name?: string;
};

function createLocalForageDriver(options: CreateLocalForageDriverOptions = {}): CacheDriver {
  const { name = "regions-of-indonesia" } = options;

  const instance = localforage.createInstance({ name });

  return {
    async get(key: string) {
      const item = await instance.getItem<Item>(key);
      return (isLive(item) && item.data) || null;
    },
    async set(key: string, value: any) {
      await instance.setItem<Item>(key, { expires: createExpires(), data: value });
    },
    async delete(key: string) {
      await instance.removeItem(key);
    },
  };
}

export { createLocalForageDriver };
