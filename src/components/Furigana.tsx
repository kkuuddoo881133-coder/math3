import { applyFuriganaWithDict } from "@/lib/furi";

export function Furigana(props: { text: string; enabled?: boolean; gradeMax?: number }) {
  const { text, enabled, gradeMax = 3 } = props;
  if (!enabled) return <span>{text}</span>;
  const html = applyFuriganaWithDict(text, true, gradeMax);
  return <span dangerouslySetInnerHTML={{ __html: html }} />;
}