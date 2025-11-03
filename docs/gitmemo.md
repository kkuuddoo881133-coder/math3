よく使うやつ
git status                 :: 状態確認（何が変わってる？）
git add .                  :: 変更を全部ステージ
git commit -m "feat: ～"   :: スナップショットを保存
git push origin main       :: GitHubへ送る
git log --oneline --graph  :: 履歴をサッと見る


git add -p                :: 変更を塊ごとに選んでステージ
git restore --staged F    :: ステージから外す（変更は残す）
git restore F             :: 変更を破棄（元に戻す・注意）
git commit --amend        :: 直前のコミットを上書き修正


コミットメッセージのコツ（今のプロジェクト向け）

feat: 新機能、fix: バグ修正、test: テスト追加、docs: ドキュメント

例：

test(ui): Furigana renders <ruby>

feat(ruby): add time/geometry terms to dict

fix: import Furigana as default in D01-U01 page