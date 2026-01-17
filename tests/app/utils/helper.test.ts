import { describe, it, expect } from "vitest";
import { makeFirstCharUpper, formatDate, getRandomFallbackImage } from "../../../app/utils/helper";

describe("helper utilities", () => {
  it("makeFirstCharUpper should uppercase first char", () => {
    expect(makeFirstCharUpper("")).toBe("");
    expect(makeFirstCharUpper("hello")).toBe("Hello");
    expect(makeFirstCharUpper("Hello")).toBe("Hello");
  });

  it("formatDate should format ISO strings to YYYY-MM-DD or return empty for invalid", () => {
    expect(formatDate("")).toBe("");
    expect(formatDate("not-a-date")).toBe("");
    expect(formatDate("2020-03-05T12:00:00Z")).toBe("2020-03-05");
    expect(formatDate("2021-12-31")).toBe("2021-12-31");
  });

  it("getRandomFallbackImage should be deterministic with seed and stable without seed", () => {
    const firstNoSeed = getRandomFallbackImage();
    expect(firstNoSeed).toBe("/404/1.webp");

    const a = getRandomFallbackImage("seed-123");
    const b = getRandomFallbackImage("seed-123");
    expect(a).toBe(b);

    const c = getRandomFallbackImage("other-seed");
    // different seed likely different index, but at least ensure value is from list
    const allowed = [
      "/404/1.webp",
      "/404/2.webp",
      "/404/3.webp",
      "/404/4.webp",
      "/404/5.webp",
      "/404/6.webp",
      "/404/7.webp",
      "/404/8.webp",
      "/404/9.webp",
    ];
    expect(allowed).toContain(a);
    expect(allowed).toContain(c);
  });
});
