// src/app/learn/d01-u01/page.tsx
"use client";
import { useMemo, useState } from "react";
import Furigana from "@/components/Furigana";
import { D01_U01, LessonBlock } from "@/content/d01-u01";
import LessonNav from "@/components/LessonNav";

export default function LessonD01U01() {
  const [furiganaOn, setFuriganaOn] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState(false);

  const lesson = useMemo(() => D01_U01, []);

  function setAns(key: string, val: string) {
    setAnswers((p) => ({ ...p, [key]: val }));
  }

  function checkAll() {
    setChecked(true);
  }

  return (
    <main className="p-6 max-w-3xl mx-auto space-y-6">
      <header className="flex items-center justify-between gap-3">
        <h1 className="text-2xl font-bold">D01-U01 こうかんほうそく</h1>
        <button
          onClick={() => setFuriganaOn((v) => !v)}
          className="border rounded px-3 py-1"
        >
          ふりがな {furiganaOn ? "ON" : "OFF"}
        </button>
      </header>

      <section className="bg-gray-50 rounded-lg p-4">
        <Furigana text={lesson.goal} enabled={furiganaOn} gradeMax={3} />
      </section>

      {lesson.blocks.map((b, i) => (
        <BlockView
          key={b.id + i}
          block={b}
          furiganaOn={furiganaOn}
          answers={answers}
          setAns={setAns}
          checked={checked}
        />
      ))}

      <footer className="flex items-center gap-3 pt-2">
        <button
          onClick={checkAll}
          className="bg-black text-white rounded px-4 py-2"
        >
          こたえあわせ
        </button>
        {checked && (
          <span className="text-sm text-gray-600">
            まるつけを したよ。まちがえた ところを なおそう。
          </span>
        )}
      </footer>

      {/* ← ここが重要：JSX 内、</main> の直前に置く */}
      <LessonNav currentId="D01-U01" />
    </main>
  );
}

function BlockView(props: {
  block: LessonBlock;
  furiganaOn: boolean;
  answers: Record<string, string>;
  setAns: (k: string, v: string) => void;
  checked: boolean;
}) {
  const { block: b, furiganaOn, answers, setAns, checked } = props;

  if (b.kind === "text") {
    return (
      <section className="space-y-2">
        {b.title && <h2 className="text-xl font-semibold">{b.title}</h2>}
        {b.body.map((p, idx) => (
          <p key={idx} className="leading-7">
            <Furigana text={p} enabled={furiganaOn} gradeMax={3} />
          </p>
        ))}
      </section>
    );
  }

  if (b.kind === "example") {
    return (
      <section className="space-y-2">
        {b.title && <h2 className="text-xl font-semibold">{b.title}</h2>}
        <ul className="list-disc pl-6 space-y-2">
          {b.examples.map((ex, idx) => (
            <li key={idx}>
              <span className="font-mono">{ex.exprA}</span>{" "}
              <span className="mx-1">と</span>{" "}
              <span className="font-mono">{ex.exprB}</span>
              {ex.note && (
                <>
                  {" "}
                  — <Furigana text={ex.note} enabled={furiganaOn} gradeMax={3} />
                </>
              )}
            </li>
          ))}
        </ul>
      </section>
    );
  }

  if (b.kind === "practice") {
    return (
      <section className="space-y-3">
        {b.title && <h2 className="text-xl font-semibold">{b.title}</h2>}
        {b.practices.map((q, idx) => {
          const key = `Q${b.id}-${idx}`;
          const val = answers[key] ?? "";
          if (q.type === "choice") {
            const correct = checked && val === q.answer;
            return (
              <div key={key} className="border rounded p-3">
                <p className="mb-2">
                  <Furigana text={q.stem} enabled={furiganaOn} gradeMax={3} />
                </p>
                <div className="flex flex-wrap gap-2">
                  {q.choices.map((c) => {
                    const active = val === c;
                    return (
                      <button
                        key={c}
                        onClick={() => setAns(key, c)}
                        className={
                          "border rounded px-3 py-1 " +
                          (active ? "bg-blue-600 text-white" : "")
                        }
                      >
                        {c}
                      </button>
                    );
                  })}
                </div>
                {checked && (
                  <p
                    className={
                      "mt-2 text-sm " +
                      (correct ? "text-green-700" : "text-red-700")
                    }
                  >
                    {correct ? "せいかい！" : `ざんねん… こたえは「${q.answer}」`}
                  </p>
                )}
              </div>
            );
          } else {
            const correct = checked && normalize(val) === normalize(q.answer);
            return (
              <div key={key} className="border rounded p-3">
                <p className="mb-2">
                  <Furigana text={q.stem} enabled={furiganaOn} gradeMax={3} />
                </p>
                <input
                  value={val}
                  onChange={(e) => setAns(key, e.target.value)}
                  className="border rounded px-2 py-1 w-40"
                  placeholder="例）6×9"
                />
                {checked && (
                  <p
                    className={
                      "mt-2 text-sm " +
                      (correct ? "text-green-700" : "text-red-700")
                    }
                  >
                    {correct
                      ? "せいかい！"
                      : `ざんねん… こたえは「${q.answer}」`}
                  </p>
                )}
              </div>
            );
          }
        })}
      </section>
    );
  }

  return null;
}

function normalize(s: string) {
  return s.replace(/\s+/g, "").trim();
}

async function getHint(qid: string, level: 1|2|3, stem: string, userAnswer?: string) {
  const r = await fetch("/api/hint", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ qid, level, stem, userAnswer, gradeMax: 3 }),
  });
  const data = await r.json();
  return data.hint as string;
}