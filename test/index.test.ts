import { describe, expect, it, vi } from "vitest";

import { hasOwnProperties, isTypeofObject } from "javascript-yesterday";

import { createLocalForageDriver } from "../src";

describe("Code", () => {
  it("Type check", async () => {
    const driver = createLocalForageDriver();

    expect(isTypeofObject(driver) && hasOwnProperties(driver, "get", "set", "delete")).toBeTruthy();
    expect(driver.get).toBeTypeOf("function");
    expect(driver.set).toBeTypeOf("function");
    expect(driver.delete).toBeTypeOf("function");
  });

  it("Flow", async () => {
    const driver = createLocalForageDriver();

    const null_item_a = await driver.get("a");
    expect(null_item_a).toBeNull();

    await driver.set("a", { im: "a" });

    const item_a = await driver.get("a");
    expect(item_a).toEqual({ im: "a" });

    await driver.delete("a");

    const deleted_item_a = await driver.get("a");
    expect(deleted_item_a).toBeNull();

    const null_item_b = await driver.get("b");
    expect(null_item_b).toBeNull();

    await driver.set("b", { im: "b" });

    const item_b = await driver.get("b");
    expect(item_b).toEqual({ im: "b" });

    vi.setSystemTime(new Date(new Date().getTime() + 2 * 30 * 24 * 60 * 60 * 1000));

    const expired_item_b = await driver.get("b");
    expect(expired_item_b).toBeNull();
  });
});
