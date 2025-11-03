import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  project: process.env.OPENAI_PROJECT || undefined,
});

// 小3向けヒントのガイド（短く）
const SYSTEM = `
あなたは小3向けの算数チューター。出せるのは「ヒント」だけで、答えは言わない（level3でも最後の一歩は残す）。
やさしい言葉で、未習漢字はひらがなに置き換え。1〜3文、箇条書きOK。
禁止: 正解の数字や式をそのまま提示すること。
`;

// まずは chat 可能モデルを環境変数 or 既定で
const MODEL = process.env.HINT_MODEL || "gpt-5-nano";

export async function POST(req: NextRequest) {
  try {
    const { qid, level, stem, userAnswer, gradeMax = 3 } = await req.json();

    // ✅ 余計なパラメータを一切入れない（model / messages だけ）
    const resp = await client.chat.completions.create({
      model: MODEL,
      messages: [
        { role: "system", content: SYSTEM },
        {
          role: "user",
          content:
`問題ID: ${qid}
段階: level ${level}（1=方向づけ / 2=途中式の骨組み / 3=ほぼ答え直前）
学年: 小${gradeMax}
問題文: ${stem}
子の入力: ${userAnswer ?? "(未入力)"}`,
        },
      ],
    });

    const hint = resp.choices?.[0]?.message?.content?.trim();
    if (!hint) throw new Error("no_output_text");

    return NextResponse.json({ ok: true, hint });
  } catch (err) {
    console.error("[/api/hint] error:", err);
    // UIを止めないフォールバック
    return NextResponse.json({
      ok: false,
      hint: "ヒントが だせなかったよ。図を かいたり、かずを わけて かんがえてみよう。"
    });
  }
}

export async function GET() {
  return NextResponse.json({ ok: false, error: "Use POST" }, { status: 405 });
}
