import { describe, expect, it, vi } from "vitest";

import { createLocalForageDriver } from "../src";

describe("Code", () => {
  it("Type check", async () => {
    const driver = createLocalForageDriver();

    expect(driver).toBeTypeOf("object");
    expect(driver.get).toBeTypeOf("function");
    expect(driver.set).toBeTypeOf("function");
    expect(driver.del).toBeTypeOf("function");
  });

  it("Flow", async () => {
    const driver = createLocalForageDriver({ ttl: 1 * 30 * 24 * 60 * 60 * 1000 });

    const null_item_a = await driver.get("a");
    expect(null_item_a).toBeNull();

    await driver.set("a", { me: "a" });

    const item_a = await driver.get("a");
    expect(item_a).toEqual({ me: "a" });

    await driver.del("a");

    const deld_item_a = await driver.get("a");
    expect(deld_item_a).toBeNull();

    const null_item_b = await driver.get("b");
    expect(null_item_b).toBeNull();

    await driver.set("b", { me: "b" });

    const item_b = await driver.get("b");
    expect(item_b).toEqual({ me: "b" });

    vi.setSystemTime(new Date(new Date().getTime() + 2 * 30 * 24 * 60 * 60 * 1000));

    const expired_item_b = await driver.get("b");
    expect(expired_item_b).toBeNull();
  });
});
