// src/lib/kanji-grades.ts
export const G1 = (
  "一二三四五六七八九十" +
  "上下左右中大小" +
  "山川田口目耳手足" +
  "日月火水木金土" +
  "人子女" +
  "学校本文休" +
  "玉犬虫貝車雨"
).split("");

export const G2 = (
  "引羽雲園遠何科夏家歌画回会海絵外角楽活間丸岩顔汽記帰弓牛魚京強教近兄形計元言原戸古午後語工公広交光考行高黄合谷国黒今才細作算止市矢姉思紙寺自時室社弱首秋週春書少場所食心新親図数西声星晴切雪船線前組走多太体台地池知茶昼長鳥朝直通弟店点電刀冬当東答頭同道読内南肉馬売買麦半番父風分聞米歩母方北毎妹万明鳴毛門夜野友用曜来里理話"
).split("");

export const G3 = (
  "悪安暗医委意育員飲院運泳駅央横屋温化荷界開階寒感漢岸起客究級宮急球去橋業曲局銀区苦具君係軽血決研県庫湖向幸港号根祭昨札刷殺察参産散残氏司試児治辞失借種周州拾終習集住重宿所暑助昭消商章勝乗植申身神真深進世整昔全相送想息速族他打対待代題炭短談着注柱丁帳調追定庭笛鉄転都度投島湯登等動童農波配倍箱畑発反坂板皮悲美鼻筆氷表秒病品負部服福物平返勉放味命面問夜野薬由油遊有予羊洋葉陽様落流旅両緑礼列練路"
).split("");

export function learnedKanjiSet(gradeMax = 3): Set<string> {
  const set = new Set<string>();
  if (gradeMax >= 1) G1.forEach(k => set.add(k));
  if (gradeMax >= 2) G2.forEach(k => set.add(k));
  if (gradeMax >= 3) G3.forEach(k => set.add(k));
  return set;
}

export function containsUnlearnedKanji(s: string, gradeMax = 3): boolean {
  const learned = learnedKanjiSet(gradeMax);
  for (const ch of s) {
    if (/[\u4E00-\u9FFF]/.test(ch) && !learned.has(ch)) return true;
  }
  return false;
}
