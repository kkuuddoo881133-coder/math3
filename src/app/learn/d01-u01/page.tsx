"use client";
import { useState } from "react";
import { Furigana } from "@/components/Furigana";

export default function LessonD01U01() {
  const [furiganaOn, setFuriganaOn] = useState(false);

  return (
    <main className="p-6 max-w-screen-sm mx-auto leading-relaxed">
      {/* ヘッダ */}
      <header className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">かけざん：こうかんほうそく</h1>
        <label className="inline-flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={furiganaOn}
            onChange={(e) => setFuriganaOn(e.target.checked)}
          />
          ふりがな {furiganaOn ? "ON" : "OFF"}
        </label>
      </header>

      <p className="mt-3">
        <Furigana
          enabled={furiganaOn}
          text={
            "「3このあめが4グループ」でも「4グループに3こずつ」でも、ぜんぶでおなじかずになるよ。これを 交換法則 というよ。"
          }
        />
      </p>

      <section className="mt-6">
        <h2 className="text-xl font-semibold">れいだい</h2>
        <p className="mt-2">
          <Furigana enabled={furiganaOn} text={"3 × 4 と 4 × 3 は、どちらも 12。"} />
        </p>
      </section>

      <section className="mt-6">
        <h2 className="text-xl font-semibold">れんしゅう</h2>
        <p className="mt-2">
          <Furigana
            enabled={furiganaOn}
            text={"5 × 2 と 2 × 5 は、どちらも いくつ？"}
          />
        </p>
      </section>
    </main>
  );
}
