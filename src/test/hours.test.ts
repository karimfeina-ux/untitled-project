import { describe, it, expect } from "vitest";
import { isOpenAt } from "@/lib/hours";
import { sites } from "@/lib/sites";

const bake = sites.find((s) => s.slug === "forn-jaume-montserrat")!.schedule;
const bar = sites.find((s) => s.slug === "petit-bar")!.schedule;

// Oct 2026 Barcelona is UTC+2.
describe("open now (Barcelona time)", () => {
  it("bakery open Wednesday 08:00", () => expect(isOpenAt(bake, new Date("2026-10-21T06:00:00Z"))).toBe(true));
  it("bakery closed Sunday", () => expect(isOpenAt(bake, new Date("2026-10-25T10:00:00Z"))).toBe(false));
  it("bakery closed Wednesday 07:00 before 07:15", () => expect(isOpenAt(bake, new Date("2026-10-21T05:00:00Z"))).toBe(false));
  it("Petit Bar closed Tuesday 17:00 (afternoon break)", () => expect(isOpenAt(bar, new Date("2026-10-20T15:00:00Z"))).toBe(false));
  it("Petit Bar closed Monday", () => expect(isOpenAt(bar, new Date("2026-10-19T10:00:00Z"))).toBe(false));
});
