# 小3算数アプリ 仕様書 v1.2（Next.js版・全体）

最終更新: 2025-11-03（JST）
作成: ChatGPT（あなたの構想＋こちらの提案を統合）

---

## 0. 目的と方針

* **目的**: 小3向けに、教科書的な流れ（**導入→例題→練習**）で理解→定着まで導く学習アプリを作る。
* **方針**

  * 小3までの漢字は漢字表記、**未習漢字のみ自動ふりがな**（ON/OFF）。
  * 操作は**タップ中心**（選択式主体、入力は最小限）。
  * 正答率/時間/ヒント使用に応じた**軽い適応**と**復習スケジュール**。
  * コンテンツは「**教科書モード（本文）**＋**ドリル**」で増やす。

---

## 1. スコープ（現行MVP）

* **対象**: 小学3年（先取り・さかのぼり学習OK）
* **単元（4〜6月想定）**

  * **D01 かけ算**

    * U01: 交換法則（こうかんほうそく）
    * U02: 分配の考え（たし算・ひき算との関係）
    * U03: 10のまとまり / 10×a, a×10
    * U04: 10をこえる数の乗法（性質の利用）
    * U05: a×0, 0×a, 0×0
    * U06: 九九の利用（未知数を求める）
  * **D02 時こくと時間**（秒/分↔秒/時間の加減）
  * **D03 わり算**（等分除/包含除、1位数の除法、a÷a/0÷a/a÷1、公約数入門）
* **現状の実装状況**

  * 画面: `/learn/d01-u01`, `/learn/d01-u02` 完了
  * ふりがな: **未習漢字のみ**の付与を実装（辞書併用）
  * UIテスト/ユニットテスト: 初期セット済

---

## 2. 画面とUX

* **ホーム**（今後）: 「今日の5問」「つづきから」「教科書をよむ」「ふりがなON/OFF」
* **教科書ページ**（実装済テンプレ）

  * ヘッダ: タイトル / ふりがなトグル
  * セクション: **めあて** → **本文（導入/例題/考え方）** → **練習（選択式中心）**
  * フッタ: 「こたえあわせ」→ 採点メッセージ
  * 下部: **ミニ回遊ナビ**（`<LessonNav />`）で前後単元へ
* **ドリル画面**（v0.2以降）: 1問ずつ、ヒント段階表示、次へ

---

## 3. ふりがな仕様

* **モード**: ON/OFF（ページ右上）
* **対象**: 教科書本文・問題文（UIラベルは除外）
* **付与ルール**

  * **小1〜小3漢字セットに含まれない漢字**を含む語に `<ruby>語<rt>よみ</rt></ruby>`
  * 用語辞書（例: 交換法則, 被乗数, 等分除 など）は固定の読みで優先付与
* **実装**:

  * `src/lib/kanji-grades.ts` … G1/G2/G3 配列＋判定関数
  * `src/lib/furi.ts` … 簡易トークン化＋辞書ルビ付与
  * `src/components/Furigana.tsx` … テキスト→`dangerouslySetInnerHTML` で描画

---

## 4. コンテンツ仕様（教科書モード）

* **データ形**（例）

  * `src/content/d01-u01.ts`, `src/content/d01-u02.ts`
  * 構造: `{ goal: string, blocks: LessonBlock[] }`

    * `LessonBlock.kind` in `"text" | "example" | "practice"`
    * `"practice"` は `type: "choice" | "short"`（将来 `"manipulate"` など拡張）
* **言語配慮**:

  * 小3までの漢字は漢字、未習は平仮名＋必要に応じルビ
  * 文章は**ゆっくり・ていねい**、1文はなるべく短く

---

## 5. データスキーマ（将来のDB/CSV想定）

`qid, grade, domain_id, subunit_id, type, stem_text, choices, answer, tags, difficulty, hint1, hint2, hint3, source`

---

## 6. 適応・復習（MVP）

* 指標: 正答/解答時間/ヒント使用
* ルール（例）

  * 正答◎ & 速い → 難度↑ / 新規
  * 誤答 or 遅い → 同種の基礎へ戻す
* 復習: 1, 3, 7, 14, 30日を基準に**忘却曲線**で再提示

---

## 7. テスト計画（現状）

* **ユニット**（Vitest）

  * `tests/kanji-grades.test.ts` … 未習漢字判定の精度
  * `tests/furi.test.ts` … 辞書ルビ付与/二重付与防止
* **UI**（happy-dom + Testing Library）

  * `tests/Furigana.ui.test.tsx` … `<ruby>` 出現確認
* **今後**: 画面遷移・採点・ヒント段階のUIテスト

---

## 8. 技術スタック / プロジェクト構成

* **主要**: Next.js **16**, React **19**, TypeScript **5.9**, pnpm, Tailwind CSS **v4**
* **テスト**: Vitest, @testing-library/react, happy-dom
* **フォルダ**

  ```
  src/
    app/
      page.tsx
      learn/
        d01-u01/page.tsx
        d01-u02/page.tsx
    components/
      Furigana.tsx
      LessonNav.tsx
    content/
      d01-u01.ts
      d01-u02.ts
    lib/
      furi.ts
      kanji-grades.ts
  tests/
    furi.test.ts
    kanji-grades.test.ts
    Furigana.ui.test.tsx
  ```
* **ランタイム**: Node.js **v20 LTS**（Turbopackは無効化済み）

---

## 9. 現在のルーティング

* `/`（仮）: ホーム（今後整備）
* `/learn/d01-u01`: こうかん法則（完成）
* `/learn/d01-u02`: 分配の考え（完成）
* （今後）`/learn/d01-u03` 以降を順次追加

---

## 10. 今後の開発順（短い粒度）

1. D01-U03〜U06 を **同じ型**で量産（テキスト＋選択式2問）
2. D02（時こくと時間）の導入ページ → 練習（くり上がり/下がり）
3. D03（わり算）導入：等分除/包含除の図入り説明
4. ホーム画面の最小実装（今日の5問/続きから/ふりがな）
5. 結果画面の最小実装（正答率、メモ一言）
6. 学年漢字セット・用語辞書の拡充（誤ルビ対策）

---

### 付録A: コンテンツ・ブロック型

```ts
type Lesson = {
  goal: string;
  blocks: LessonBlock[];
};
type LessonBlock =
  | { kind: "text"; id: string; title?: string; body: string[] }
  | { kind: "example"; id: string; title?: string; examples: any[] } // 単元で型を定義
  | {
      kind: "practice";
      id: string; title?: string;
      practices: (
        | { type: "choice"; stem: string; choices: string[]; answer: string }
        | { type: "short";  stem: string; answer: string }
      )[];
    };
```

---

## 11. 品質基準（受け入れ）

* **表示**: 行間/サイズ/余白が読みやすい、未習漢字のみルビ、切替即時反映
* **操作**: スマホ/タブレットでタップ操作がしやすい（44px以上）
* **採点**: 「こたえあわせ」で即時メッセージ、つぎの学習誘導
* **パフォーマンス**: 教科書ページ初期表示 < 2s（Wi-Fi環境）

---

## 12. リスクと対策

* **ルビ過多** → 未習のみ付与・辞書で例外語上書き
* **誤答の固定化** → ヒント段階と良問再提示で解決
* **実装拡大の負担** → コンテンツの**テンプレ化**と小さなPR分割

---

## 13. 実装メモ（VS Code / Git）

* **起動**: `pnpm dev`（Turbopack無効・Port:3000）
* **テスト**: `pnpm test` / 対話UIは `pnpm run test:ui`
* **Git**

  * 変更確認: `git status`
  * スナップショット: `git add . && git commit -m "feat: ..."`
  * 反映: `git push origin main`

---

## 14. 直近TODO（あなたが進めやすい順でOK）

* [ ] **D01-U03** ページ（「10のまとまり」）本文＋選択式2問
* [ ] **D01-U04** ページ（「性質を使って大きい数」）本文＋選択式2問
* [ ] **ホーム**最小実装（リンク集＋ふりがなトグル反映）
* [ ] **辞書**: 用語・表記ゆれの追加（例: 「こうかん法則/交換法則」）
