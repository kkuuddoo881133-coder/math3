"use client";
import { useState } from "react";

type Props = {
  qid: string;
  stem: string;
  gradeMax?: number;
};

export default function HintButton({ qid, stem, gradeMax = 3 }: Props) {
  const [level, setLevel] = useState<1 | 2 | 3>(1);
  const [loading, setLoading] = useState(false);
  const [hint, setHint] = useState<string>("");

  async function ask() {
    setLoading(true);
    setHint("");
    try {
      const r = await fetch("/api/hint", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ qid, level, stem, userAnswer: "", gradeMax }),
      }).then((r) => r.json());
      setHint(r.hint ?? "");
    } finally {
      setLoading(false);
    }
  }

  function nextLevel() {
    setLevel((l) => (l === 1 ? 2 : l === 2 ? 3 : 1));
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <button
          onClick={ask}
          disabled={loading}
          className="border rounded px-3 py-1"
        >
          {loading ? "…生成中" : `ヒント（段階${level}）`}
        </button>
        <button onClick={nextLevel} className="text-sm underline">
          段階切替
        </button>
      </div>
      {hint && (
        <div className="rounded bg-yellow-50 p-2 text-sm leading-6 whitespace-pre-wrap">
          {hint}
        </div>
      )}
    </div>
  );
}
