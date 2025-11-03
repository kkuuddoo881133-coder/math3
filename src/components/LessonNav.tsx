// src/components/LessonNav.tsx
"use client";
import Link from "next/link";

type Node = { id: string; title: string; href: string };
const lessons: Node[] = [
  { id: "D01-U01", title: "D01-U01 こうかん法則", href: "/learn/d01-u01" },
  { id: "D01-U02", title: "D01-U02 分配の考え", href: "/learn/d01-u02" },
];

export default function LessonNav({ currentId }: { currentId: string }) {
  const idx = lessons.findIndex(v => v.id === currentId);
  const prev = idx > 0 ? lessons[idx - 1] : null;
  const next = idx >= 0 && idx < lessons.length - 1 ? lessons[idx + 1] : null;

  return (
    <nav className="flex items-center justify-between gap-3 pt-6">
      {prev ? (
        <Link className="border rounded px-4 py-2" href={prev.href}>
          ← まえ（{prev.title}）
        </Link>
      ) : <span />}

      <Link className="border rounded px-4 py-2" href="/">ホーム</Link>

      {next ? (
        <Link className="border rounded px-4 py-2" href={next.href}>
          つぎ（{next.title}）→
        </Link>
      ) : <span />}
    </nav>
  );
}
