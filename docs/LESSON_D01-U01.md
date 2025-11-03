D01-U01 仕様書（WHAT）
1. 学習目標

「○×□＝□×○」の交換法則を、言葉・式・図で説明できる。

「被乗数・乗数・積」の関係を短文で言える。

6の段・7の段などを使って手早く計算できる（暗算補助OK）。

2. ページ構成（T1〜T6）

T1 めあて：やさしい言い換え＋未習のみふりがな
例：「かけ算は じゅんばんを かえても 同じ 数（積）に なることを しろう。」

T2 どうして？（導入）：おはじき/タイル図（3行×4列 と 4行×3列）で見かたを示す。

T3 れいだい：

例①：3×4＝12 と 4×3＝12

例②：6×7＝42 と 7×6＝42

T4 考えかた：
①「ならべ方を かえる」→ ②「数は 同じ」→ ③「積は 同じ」
キーワード：交換法則（こうかんほうそく）

T5 れんしゅう：

選択1：8×5 と 5×8 はどちらが かんたん？（同じ → 理由）

記述1：9×6 を べつの ならべ方にして 式で書こう（6×9）

T6 ポイント：□×○＝○×□ のかきかえ、九九の知っているだんへ置きかえ。

3. ふりがな・語彙ルール

小1〜3で未習の漢字を含む語だけに ruby（交換法則 等は辞書読みで固定）。

UI文言はルビ対象外。本文・問題文のみ。

4. 完了基準（受け入れ）

ふりがなON/OFFが即時反映。未習のみ付与。

例題2つ・練習2問が正しく表示/採点（練習は正誤だけでOK）。

スクロール1画面内（目安：スマホ縦でも3〜4スクロール以内）。

D01-U01 詳細設計書（HOW）
1. ルーティング

Path：/learn/d01-u01

ページ種別：Client Component（Furiganaやトグル操作のため）

2. 表示ロジック

content オブジェクトから本文/例題/問題を描画（データと見た目を分離）。

ふりがなトグル：enabled（boolean）を Furigana に渡す。

練習：ラジオボタン/短文入力 → その場で採点（正誤ラベル表示だけ）。

3. データモデル（最小）
// src/content/d01-u01.ts で export
export type LessonBlock = {
  id: "T1"|"T2"|"T3"|"T4"|"T5"|"T6";
  kind: "text"|"example"|"practice";
  title?: string;
  body?: string[];           // 段落単位
  examples?: Array<{ exprA: string; exprB: string; note?: string }>;
  practices?: Array<
    | { type: "choice"; stem: string; choices: string[]; answer: string }
    | { type: "short";  stem: string; answer: string }
  >;
};
export type LessonPage = {
  id: "D01-U01";
  goal: string;
  blocks: LessonBlock[];
};

4. サンプルコンテンツ（本文はやさしい日本語）

goal: 「かけ算は じゅんばんを かえても こたえ（積）は 同じに なることを 学ぶ。」

T1.body：

「ものの ならべ方を かえても、数は かわらない ときが あります。」

「かけ算では、じゅんばんを かえても、こたえは 同じに なります。」

T2.body：

「かずカード と まる を 3行×4列 に ならべます。」

「ならべ方を 4行×3列 に かえると、見た目は ちがっても、まるの かずは 同じです。」

T3.examples：

{ exprA:"3×4＝12", exprB:"4×3＝12", note:"数の ならべ方を かえても 同じ" }

{ exprA:"6×7＝42", exprB:"7×6＝42", note:"九九を つかって たしかめる" }

T4.body：

「（1）ならべ方を かえる →（2）数は 同じ →（3）**こたえ（積）**は 同じ」

「これを 交換法則 と いいます。」

T5.practices：

choice："8×5 と 5×8 は どちらが かんたん？"、["同じ","8×5","5×8"]、答え"同じ"

short ："9×6 を べつの ならべ方で 式に しよう"、答え"6×9"

T6.body：

「□×○＝○×□ と かきかえられる。」

「九九で しっている だんに いれかえて 計算しても よい。」

※ 本文の漢字は小3までに限定。難しい語（交換法則等）は DICT で読み固定。

5. 画面コンポーネント（最小）

Furigana: 既存を利用（enabled, gradeMax）

PracticeChoice: 単一選択 + 採点表示

PracticeShort: 短文入力 + 採点表示

6. イベント計測（将来対応）

lesson_view, toggle_furigana, practice_submit（result: correct/incorrect）

7. テスト項目（最小）

UI：

ふりがなONで <ruby> が含まれる / OFFで含まれない。

練習の採点が正しく表示される。

単体：

containsUnlearnedKanji / applyFuriganaWithDict は既存テストで担保。

推奨ファイル構成（今回追加/更新）

追加：src/content/d01-u01.ts（データ）

更新：src/app/learn/d01-u01/page.tsx（データ駆動に変更）

追加（任意）：tests/learn/d01-u01.ui.test.tsx（UIテスト）

メモ用ファイルは作ってOK：
docs/LESSON_D01-U01.md にこの仕様と詳細設計を貼るのを推奨。