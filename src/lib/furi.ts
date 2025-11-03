// src/lib/furi.ts
import { containsUnlearnedKanji } from "@/lib/kanji-grades";

const DICT: Array<{ surface: string; reading: string }> = [
  { surface: "交換法則", reading: "こうかんほうそく" },
  { surface: "分配法則", reading: "ぶんぱいほうそく" },
  { surface: "被乗数", reading: "ひじょうすう" },
  { surface: "乗数", reading: "じょうすう" },
  { surface: "積", reading: "せき" },
  { surface: "等分除", reading: "とうぶんじょ" },
  { surface: "包含除", reading: "ほうがんじょ" },
  { surface: "商", reading: "しょう" },
  { surface: "余り", reading: "あまり" },
  { surface: "公約数", reading: "こうやくすう" },

  // ↓ 追加（時間・図形・単位まわりの頻出語）
  { surface: "時刻", reading: "じこく" },
  { surface: "時間", reading: "じかん" },
  { surface: "秒", reading: "びょう" },
  { surface: "分", reading: "ふん" },
  { surface: "長さ", reading: "ながさ" },
  { surface: "直角", reading: "ちょっかく" },
  { surface: "直線", reading: "ちょくせん" },
  { surface: "角", reading: "かく" },
  { surface: "図形", reading: "ずけい" },
  { surface: "面積", reading: "めんせき" },
  { surface: "体積", reading: "たいせき" }
];

/** 正規表現用に語をエスケープ */
function esc(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/** 既存の <ruby>…</ruby> ブロックを保護しつつ、非ルビ領域だけを処理 */
function splitByRubyBlocks(input: string): string[] {
  // 交互に [非ruby, ruby, 非ruby, ruby, ...] になるよう区切る
  const parts: string[] = [];
  const re = /<ruby[\s\S]*?<\/ruby>/g;
  let lastIndex = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(input))) {
    if (m.index > lastIndex) parts.push(input.slice(lastIndex, m.index)); // 非ruby
    parts.push(m[0]); // 既存ruby
    lastIndex = re.lastIndex;
  }
  if (lastIndex < input.length) parts.push(input.slice(lastIndex));
  return parts;
}

/**
 * 辞書ベースのルビ付与：
 * - enabled=false: そのまま返す
 * - 既存の <ruby>…</ruby> は尊重（重複付与しない）
 * - 学年上限 gradeMax までに「含まれない漢字」を含む辞書語だけに ruby を付ける
 */
export function applyFuriganaWithDict(
  text: string,
  enabled: boolean,
  gradeMax = 3
): string {
  if (!enabled) return text;

  // 置換の安定性のため、語の長い順で適用
  const dict = [...DICT].sort((a, b) => b.surface.length - a.surface.length);

  const segments = splitByRubyBlocks(text).map((seg) => {
    // 既存 ruby ブロックはそのまま
    if (seg.includes("<rt>") && seg.includes("</ruby>")) return seg;

    let out = seg;
    for (const { surface, reading } of dict) {
      // 未習漢字を含む語だけ対象にする（過剰ルビの抑制）
      if (!containsUnlearnedKanji(surface, gradeMax)) continue;

      const re = new RegExp(esc(surface), "g");
      out = out.replace(
        re,
        `<ruby>${surface}<rt>${reading}</rt></ruby>`
      );
    }
    return out;
  });

  return segments.join("");
}
