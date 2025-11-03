import { describe, it, expect } from "vitest";
import { applyFuriganaWithDict } from "@/lib/furi";

describe("applyFuriganaWithDict", () => {
  it("enabled=false なら原文のまま返す", () => {
    const src = "これは 交換法則 のせつめいです。";
    expect(applyFuriganaWithDict(src, false)).toBe(src);
  });

  it("辞書語で、未習漢字を含む語だけ ruby が付く", () => {
    const src = "これは 交換法則 のせつめいです。";
    const out = applyFuriganaWithDict(src, true, 3);
    expect(out).toContain("<ruby>交換法則<rt>こうかんほうそく</rt></ruby>");
  });

  it("既に <rt> を含む部分は重複付与しない", () => {
    const src = "これは <ruby>交換法則<rt>こうかんほうそく</rt></ruby> の文。";
    const out = applyFuriganaWithDict(src, true, 3);
    const count = (out.match(/交換法則/g) || []).length;
    expect(count).toBe(1);
  });
});
