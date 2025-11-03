import { describe, it, expect } from "vitest";
import { containsUnlearnedKanji } from "@/lib/kanji-grades";

describe("containsUnlearnedKanji", () => {
  it("小3までなら『日』『時』は習っている想定で未習扱いにならない", () => {
    expect(containsUnlearnedKanji("日", 3)).toBe(false);
    expect(containsUnlearnedKanji("時", 3)).toBe(false);
  });

  it("未知の漢字が入ると未習扱いになる（学年セットに無い文字）", () => {
    // 例として「則」は仮の未収載として扱う（学年リスト更新で変わる場合あり）
    expect(containsUnlearnedKanji("法則", 3)).toBe(true);
  });

  it("学年を下げると学んでいても未習扱いになる", () => {
    // 「時」はG3リスト想定。gradeMax=1なら未習。
    expect(containsUnlearnedKanji("時", 1)).toBe(true);
  });
});
