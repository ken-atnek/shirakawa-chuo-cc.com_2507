## UI実装メモ

### ハンバーガーメニューなど状態付きUI

- 開閉状態は boolean で管理する
- JSX の大きな分岐より、class 切り替えで状態を制御する
- `aria-expanded` `aria-label` などの基本属性を付ける
- 見た目の調整はできるだけ SCSS 側で行う

### この repo で特に意識すること

- 既存の `Header` `Footer` の責務を崩さない
- アニメーション追加時も、SEO や主要導線を邪魔しない
- 不要な wrapper や class を増やしすぎない

### Sass追記ルール

- 既存ファイルの並びに合わせて追記する
- `margin` `line-height` `letter-spacing` は必要時だけ追加する
- 後から見て責務が追いやすい粒度を保つ
