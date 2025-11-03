// src/lib/kanji-grades.ts
// 小1〜小3で学ぶ漢字（最小セット・あとで増やす）
export const G1 = "一二三四五六七八九十上下左右大中小山川田口目耳口手足日月火水木金土".split("");
export const G2 = "百千万空早草林森王石竹糸貝車雨".split(""); // ←仮の抜粋、あとで増強
export const G3 = "数図海点直計線曜形角算間新学校時分秒道".split(""); // ←仮の抜粋、あとで増強

// gradeMax までに“習っている”とみなす漢字の集合を作る
export function learnedKanjiSet(gradeMax = 3): Set<string> {
  const set = new Set<string>();
  if (gradeMax >= 1) G1.forEach(k => set.add(k));
  if (gradeMax >= 2) G2.forEach(k => set.add(k));
  if (gradeMax >= 3) G3.forEach(k => set.add(k));
  return set;
}

// 文字列に「未習漢字」が含まれるか（簡易判定）
export function containsUnlearnedKanji(s: string, gradeMax = 3): boolean {
  const learned = learnedKanjiSet(gradeMax);
  // おおざっぱ：CJK統合漢字の範囲だけ拾い、集合に無ければ未習
  for (const ch of s) {
    if (/[\u4E00-\u9FFF]/.test(ch) && !learned.has(ch)) return true;
  }
  return false;
}
