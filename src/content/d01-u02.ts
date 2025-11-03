// src/content/d01-u02.ts
export type LessonBlock =
  | { id: "T1" | "T2" | "T4" | "T6"; kind: "text"; title?: string; body: string[] }
  | { id: "T3"; kind: "example"; title?: string; examples: Array<{ left: string; right: string; note?: string }> }
  | {
      id: "T5";
      kind: "practice";
      title?: string;
      practices: Array<
        | { type: "short"; stem: string; answer: string }
        | { type: "choice"; stem: string; choices: string[]; answer: string }
      >;
    };

export type LessonPage = { id: "D01-U02"; goal: string; blocks: LessonBlock[] };

export const D01_U02: LessonPage = {
  id: "D01-U02",
  goal: "かけ算を 「分けて」 考えて、計算を かんたんに する（<b>分配の考え</b>）を 学ぶ。",
  blocks: [
    {
      id: "T1",
      kind: "text",
      title: "めあて",
      body: [
        "大きい かけ算を、<b>分けて</b>考える と、計算が かんたんに なる ときが ある。"
      ]
    },
    {
      id: "T2",
      kind: "text",
      title: "どうして？（導入）",
      body: [
        "7×6 を 「7×(3+3)」や「7×(5+1)」のように 分ける と、(7×3)+(7×3) などで 計算できる。",
        "9 を 「10−1」に 分ける と、<b>7×9＝(7×10)−(7×1)</b> のように かんたんに できる。"
      ]
    },
    {
      id: "T3",
      kind: "example",
      title: "れいだい",
      examples: [
        { left: "6×7", right: "6×(5+2)＝(6×5)+(6×2)＝30+12＝42", note: "7 を 5 と 2 に 分ける" },
        { left: "7×9", right: "(7×10)−(7×1)＝70−7＝63", note: "9 を 10−1 に 分ける" }
      ]
    },
    {
      id: "T4",
      kind: "text",
      title: "考えかた",
      body: [
        "a×(b+c)＝(a×b)+(a×c)",
        "a×(b−c)＝(a×b)−(a×c)",
        "むずかしい 数は、<b>10・5・2・1</b> などに 分ける と、やさしい。"
      ]
    },
    {
    id: "T5",
    kind: "practice",
    title: "れんしゅう",
    practices: [
        {
        type: "choice",
        stem: "7×8 を 5と3 に 分けて 計算する ときの 式は どれ？",
        choices: ["(7×5)+(7×3)", "(5×7)+(8×7)", "(7×8)+(5×3)"],
        answer: "(7×5)+(7×3)"
        },
        {
        type: "choice",
        stem: "7×9 を 10−1 に 分けて 計算する ときの 式は どれ？",
        choices: ["(7×10)-(7×1)", "(9×10)-(9×1)", "(7×9)-(7×1)"],
        answer: "(7×10)-(7×1)"
        },
        {
        type: "choice",
        stem: "12×6 を かんたんに する 分け方は どれ？",
        choices: ["12×(5+1)", "12×(4+2)", "12×(3+3)"],
        answer: "12×(3+3)"
        }
    ]
    },
    {
      id: "T6",
      kind: "text",
      title: "ポイント",
      body: [
        "「分ける」ときは、<b>計算しやすい 数</b>（10, 5, 2, 1 など）に する。",
        "もどす ときは、足し算・引き算 を わすれない。"
      ]
    }
  ]
};
