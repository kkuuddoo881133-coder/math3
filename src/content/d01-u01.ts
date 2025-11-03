// src/content/d01-u01.ts
export type LessonBlock =
  | {
      id: "T1" | "T2" | "T4" | "T6";
      kind: "text";
      title?: string;
      body: string[]; // 段落
    }
  | {
      id: "T3";
      kind: "example";
      title?: string;
      examples: Array<{ exprA: string; exprB: string; note?: string }>;
    }
  | {
      id: "T5";
      kind: "practice";
      title?: string;
      practices: Array<
        | { type: "choice"; stem: string; choices: string[]; answer: string }
        | { type: "short"; stem: string; answer: string }
      >;
    };

export type LessonPage = {
  id: "D01-U01";
  goal: string;
  blocks: LessonBlock[];
};

export const D01_U01: LessonPage = {
  id: "D01-U01",
  goal:
    "かけ算は じゅんばんを かえても こたえ（積）は 同じに なること（<b>交換法則</b>）を 学ぶ。",
  blocks: [
    {
      id: "T1",
      kind: "text",
      title: "めあて",
      body: [
        "ものの ならべ方を かえても、<b>数</b>が 同じなら こたえは 同じに なる ときが あります。",
        "かけ算では、<b>じゅんばん</b>を かえても、<b>こたえ（積）</b>は 同じに なります。"
      ]
    },
    {
      id: "T2",
      kind: "text",
      title: "どうして？（導入）",
      body: [
        "まるを 3行×4列 に ならべます。ぜんぶで いくつ あるかな？",
        "ならべ方を 4行×3列 に かえても、<b>まるの 数</b>は 同じだね。見た目は ちがっても、数は 同じ。"
      ]
    },
    {
      id: "T3",
      kind: "example",
      title: "れいだい",
      examples: [
        { exprA: "3×4＝12", exprB: "4×3＝12", note: "ならべ方を かえても 同じ" },
        { exprA: "6×7＝42", exprB: "7×6＝42", note: "九九で たしかめよう" }
      ]
    },
    {
      id: "T4",
      kind: "text",
      title: "考えかた",
      body: [
        "（1）ならべ方を かえる →（2）数は 同じ →（3）<b>こたえ（積）</b>は 同じ。",
        "これを <b>交換法則</b> と いいます。"
      ]
    },
    {
      id: "T5",
      kind: "practice",
      title: "れんしゅう",
      practices: [
        {
          type: "choice",
          stem: "8×5 と 5×8 は こたえは 同じ。九九で「5の だん」を つかうと 計算しやすいのは どれ？",
          choices: ["5×8", "8×5", "どちらも同じ"],
          answer: "5×8"
        },
        {
          type: "choice",
          stem: "9×6 を べつの ならべ方に すると？（交換法則）",
          choices: ["6×9", "9＋6", "9−6"],
          answer: "6×9"
        }
      ]
    },
    {
      id: "T6",
      kind: "text",
      title: "ポイント",
      body: [
        "□×○＝○×□ と かきかえられる。",
        "九九で しっている だんに いれかえて 計算しても よい。"
      ]
    }
  ]
};
