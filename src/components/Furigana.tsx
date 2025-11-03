// src/components/Furigana.tsx

export function Furigana(props: { text: string; enabled?: boolean }) {
  const { text } = props;
  return <span>{text}</span>;
}
