// src/lib/furi.ts
import { containsUnlearnedKanji } from "./kanji-grades";

export const TERM_DICT: Record<string, string> = {
  "交換法則": "こうかんほうそく",
  "被乗数": "ひじょうすう",
  "乗数": "じょうすう",
  "積": "せき",
  "等分除": "とうぶんじょ",
  "包含除": "ほうがんじょ",
  "商": "しょう",
  "余り": "あまり",
  "公約数": "こうやくすう"
};

export function applyFuriganaWithDict(
  text: string,
  enabled?: boolean,
  gradeMax = 3
): string {
  if (!enabled) return text;
  if (/<rt>/.test(text)) return text;

  let out = text;
  const terms = Object.keys(TERM_DICT).sort((a, b) => b.length - a.length);

  for (const term of terms) {
    // “未習漢字を含むときだけ”辞書ルビを付ける
    if (!containsUnlearnedKanji(term, gradeMax)) continue;

    const yomi = TERM_DICT[term];
    const re = new RegExp(`${term}(?![^<]*</rt>)`, "g");
    out = out.replace(re, `<ruby>${term}<rt>${yomi}</rt></ruby>`);
  }
  return out;
}
