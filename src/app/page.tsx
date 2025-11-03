import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-dvh grid place-items-center p-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Hello Karin!</h1>
        <p className="mt-2 text-lg">きょうは なんもん とけるかな？</p>
        <p className="mt-6 underline text-blue-600">
          <Link href="/learn/d01-u01">きょうかしょ：D01-U01 を よんでみる</Link>
        </p>
      </div>
    </main>
  );
}

