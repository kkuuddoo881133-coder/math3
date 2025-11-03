'use client';
import React from "react";
import { applyFuriganaWithDict } from "@/lib/furi";

type Props = {
  text: string;
  enabled?: boolean;   // default: true
  gradeMax?: number;   // default: 3
  className?: string;
};

export default function Furigana({
  text,
  enabled = true,
  gradeMax = 3,
  className,
}: Props) {
  const html = applyFuriganaWithDict(text, enabled, gradeMax);
  return <span className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}
