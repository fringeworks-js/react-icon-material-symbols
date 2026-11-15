# @fringeworks/react-icon-material-symbols

`@fringeworks/react-icon-material-symbols` は、Google の [Material Symbols](https://fonts.google.com/icons) を、アイコン名の型と可変フォントの軸付きで React の部品として使う、誰かにとっては便利なライブラリです。

**[English README is available here](./README.md)**

[`@fringeworks/react-icon`](https://www.npmjs.com/package/@fringeworks/react-icon) のアダプターです。react-icon の部品と同じく `<Icon value="home" />` の形で描け、react-icon の `createPrefixedIcon` などと組み合わせられます。react-icon はこのパッケージと一緒に入るので、別に入れる必要はありません。

## インストール

```bash
npm install @fringeworks/react-icon-material-symbols
```

React 18 と 19 に対応しています。

## 使い方

1. このパッケージの CSS を、アプリで1回読み込みます。アイコンの箱の CSS（react-icon のもの）も含んでいます。
2. 使う種類のフォントを読み込みます。このパッケージの `font-<種類>.css` を読み込むのがいちばん簡単です（ほかの方法は下の「フォントの読み込み」）。
3. 部品の `value` にアイコンの名前を渡します。

```tsx
import { MaterialSymbolOutlined } from '@fringeworks/react-icon-material-symbols';
import '@fringeworks/react-icon-material-symbols/styles.css';
import '@fringeworks/react-icon-material-symbols/font-outlined.css';

<MaterialSymbolOutlined value="home" />;
```

`value` の型は Material Symbols のアイコンの名前（`MaterialSymbolValue`）なので、補完が効き、書き間違いは型エラーになります。

### 3つの種類

Material Symbols の種類ごとに部品が分かれています。アプリでは種類を1つにそろえることが多いので、短い名前は import の別名で付けてください。

| 部品                     | フォントファミリー          |
| ------------------------ | --------------------------- |
| `MaterialSymbolOutlined` | `Material Symbols Outlined` |
| `MaterialSymbolRounded`  | `Material Symbols Rounded`  |
| `MaterialSymbolSharp`    | `Material Symbols Sharp`    |

```tsx
import { MaterialSymbolRounded as Icon } from '@fringeworks/react-icon-material-symbols';
```

### フォントの読み込み

フォントの読み込みは、アイコンの見た目（`styles.css`）とは別の入口にしています。次のどれかで、使う種類のフォントを読み込みます。どれも `@font-face` だけを使い、フォントに付いているクラス（`.material-symbols-outlined` など）は使いません。

**このパッケージの入口から読み込む**

```ts
import '@fringeworks/react-icon-material-symbols/font-outlined.css';
```

| 入口                | 読み込むフォント            |
| ------------------- | --------------------------- |
| `font-outlined.css` | `Material Symbols Outlined` |
| `font-rounded.css`  | `Material Symbols Rounded`  |
| `font-sharp.css`    | `Material Symbols Sharp`    |

中身は、このパッケージと一緒に入る npm の [`material-symbols`](https://www.npmjs.com/package/material-symbols) の CSS を読み込む `@import` です。フォントのファイルは、アプリのバンドラー（Vite・webpack・Next.js など）が `material-symbols` から取り込みます。フォントは全アイコン入りで、1種類 3.5〜5.4MB あります。

**Google Fonts から読み込む**

```html
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-25..200&display=block"
/>
```

可変フォントの軸を使うには、URL に軸の範囲（`opsz,wght,FILL,GRAD@20..48,100..700,0..1,-25..200`）を書きます。`&icon_names=home,search` を足すと、使うアイコンだけのフォントになり、ファイルが小さくなります。

**自分で配る**

外部のサーバーにアクセスしない構成で、使うアイコンだけにサブセット化したフォントを配るときなどは、`@font-face` を自分で書きます。フォントファミリーの名前は、上の表のものにします。

このパッケージの入口を読み込まなければ、`material-symbols` のフォントはアプリに入りません（インストールはされます）。

自分で配るときも `font-display: block` にしてください。フォントが届くまで（最大で約3秒）アイコンを描かず、アイコンの名前の文字が見えずに済みます（このパッケージの入口と、上の Google Fonts の URL は `block` です）。その間にスケルトンを出す方法は、下の「フォントの読み込み中にスケルトンを出す」にあります。

### 大きさと色

アイコンは正方形の箱に描き、色は `color` を受け継ぎます。大きさは、周りの文字と同じに見える大きさ（親の `font-size` の 1.25 倍）です。Material Symbols は字形の周りに余白が多く、1em では文字より小さく見えるためです（react-icon の `--frg-icon-glyphScale` を `1.25` にしています）。縦の位置は、どのフォントの日本語や英字と並べても真ん中がそろって見えるよう、文字のベースラインを基準に決めています（react-icon の「大きさ・位置・色」）。

Material Symbols の付属のクラスのように 24px に固定しないので、24px にしたいときは `font-size` を指定します（指定した大きさになります）。ボタンの中など、react-components の部品の中のアイコンは、部品が決めた大きさになります。

```tsx
<MaterialSymbolOutlined
  value="home"
  style={{ fontSize: 24, color: 'tomato' }}
/>
```

### 可変フォントの軸

Material Symbols の4つの軸を、プロパティで変えられます。

```tsx
<MaterialSymbolOutlined value="favorite" filled />
<MaterialSymbolOutlined value="settings" fontWeight={300} grade={-25} />
<MaterialSymbolOutlined value="search" opticalSize={20} />
```

| プロパティ     | 軸     | 説明                                                                                                          |
| -------------- | ------ | ------------------------------------------------------------------------------------------------------------- |
| `fontWeight?`  | `wght` | 太さ（100〜700）。CSS の `font-weight` で描く                                                                 |
| `filled?`      | `FILL` | `true` で塗りつぶした形、`false`（既定）で線の形。0〜1 の数値で途中の形にもできる                             |
| `grade?`       | `GRAD` | グレード（-25〜200）。太さ（アイコンの大きさ）を変えずに、線の濃さを変える                                    |
| `opticalSize?` | `opsz` | 光学サイズ（20〜48）。指定しなければ、ブラウザーが文字の大きさに合わせて決める（`font-optical-sizing: auto`） |

軸のプロパティは、乗ったときなど、すべての状態に効きます（`design` に1つの値で書いたのと同じ）。軸の値は CSS 変数（`--frg-materialsymbol-filled` など。下の「デザインの値」の表）から組み立てるので、CSS でも軸ごとに変えられます。

### アイコンに乗ったときに変える

`design` で、アイコンに乗ったとき（`:hover`）の値を軸ごとに指定できます。

```tsx
<MaterialSymbolOutlined
  value="favorite"
  design={{ filled: { hover: 1 }, fontWeight: { hover: 600 } }}
/>
```

ボタンなど、親の要素に乗ったときに変えるには、CSS で変数を設定します。アイコン自身に乗ったときの変数（`-hover`）も書いてください。書かないと、ポインターがアイコンの上に来たときに、アイコンの `:hover` の既定の値に戻ります。

```css
.favorite-button:hover {
  --frg-materialsymbol-filled: 1;
  --frg-materialsymbol-filled-hover: 1;
}
```

`filled` などのプロパティを指定すると、要素に変数を書くので、親から受け継いだ値より優先されます。親の CSS で変えるアイコンには、そのプロパティを指定しないでください。

アプリで共通のデザインは、[`@fringeworks/react-contract`](https://www.npmjs.com/package/@fringeworks/react-contract) の `withDesign` で決められます。部品は、静的なプロパティ `designDefinition` にデザインの定義を持っています。

```tsx
import { withDesign } from '@fringeworks/react-contract';

const Icon = withDesign(MaterialSymbolOutlined, { filled: { hover: 1 } });
```

### プロパティ・`design`・`withDesign` の重なり方

同じ軸を複数の方法で指定したときは、使う場所の `design` ＞ 軸のプロパティ ＞ `withDesign` の値（`fallbackDesign`）の順に強くなります。強い方で指定していない状態は、弱い方の値になります。

| 指定                                                                   | 状態なし | 乗ったとき            |
| ---------------------------------------------------------------------- | -------- | --------------------- |
| `fontWeight={300}`                                                     | 300      | 300                   |
| `fontWeight={300}` と `design={{ fontWeight: { hover: 700 } }}`        | 300      | 700                   |
| `design={{ fontWeight: { base: 700 } }}`                               | 700      | 400（部品の既定の値） |
| `design={{ fontWeight: 700 }}`                                         | 700      | 700                   |
| `withDesign` の `{ fontWeight: { hover: 700 } }` と `fontWeight={300}` | 300      | 300                   |

- `design` の状態ごとのオブジェクトで省略した状態は、`base` の値を引き継ぎません（`{ base: 700 }` は状態なしの値だけを決めます）。すべての状態で同じにするときは、1つの値（`fontWeight: 700`）で書きます。
- `withDesign` の値は、使う場所のプロパティより弱くなります。アプリで共通に決めた軸も、使う場所でプロパティを書けば変えられます。

### 読み上げ

`aria-label`・`aria-labelledby` を渡すと、画像（`role="img"`）として読み上げられます。渡さなければ、飾りとして `aria-hidden` が付きます。

```tsx
<button type="button">
  <MaterialSymbolOutlined value="search" /> 検索 {/* 飾り */}
</button>
<button type="button">
  <MaterialSymbolOutlined value="search" aria-label="検索" /> {/* アイコンだけのボタン */}
</button>
```

### フォントの読み込み中にスケルトンを出す

部品は、描くのに要る Web フォントを `webFonts` に持っています。[`@fringeworks/react-defer-rendering`](https://www.npmjs.com/package/@fringeworks/react-defer-rendering) の `useDeferUntilWebFontReady` にそのまま渡せます。

```tsx
import { useDeferUntilWebFontReady } from '@fringeworks/react-defer-rendering';

function Toolbar() {
  const { node } = useDeferUntilWebFontReady(
    <MaterialSymbolOutlined value="home" />,
    MaterialSymbolOutlined.webFonts,
    { pending: <Skeleton /> },
  );
  return node;
}
```

### 型に無い名前を使う

`MaterialSymbolValue` は、このパッケージと一緒に入る npm の `material-symbols` の型で、入っているフォントの名前とそろいます。新しく増えたアイコンなど、型に無い名前を使いたいときは、react-icon の `createFontIcon` で名前の型を広げた部品を作れます（可変フォントの軸のプロパティと `design` は持ちません）。

```tsx
import { createFontIcon } from '@fringeworks/react-icon';
import type { MaterialSymbolValue } from '@fringeworks/react-icon-material-symbols';

const Icon = createFontIcon<MaterialSymbolValue | 'new_icon'>({
  fontFamily: 'Material Symbols Outlined',
});
```

## API

| 部品                     | 説明                                    |
| ------------------------ | --------------------------------------- |
| `MaterialSymbolOutlined` | Material Symbols の Outlined のアイコン |
| `MaterialSymbolRounded`  | Material Symbols の Rounded のアイコン  |
| `MaterialSymbolSharp`    | Material Symbols の Sharp のアイコン    |

### `MaterialSymbolOutlined`・`MaterialSymbolRounded`・`MaterialSymbolSharp`

```ts
MaterialSymbolOutlined(props: MaterialSymbolProps): ReactElement
MaterialSymbolRounded(props: MaterialSymbolProps): ReactElement
MaterialSymbolSharp(props: MaterialSymbolProps): ReactElement
```

`value` のアイコンを、`<span>` に合字の文字として描きます。そのほかの props は `<span>` に渡し（`ref` も `<span>` を指します）、`className`・`style` は合成して、同じプロパティは受け取った値を優先します。

| プロパティ        | 型                     | 説明                                                                                                    |
| ----------------- | ---------------------- | ------------------------------------------------------------------------------------------------------- |
| `value`           | `MaterialSymbolValue`  | アイコンの名前                                                                                          |
| `fontWeight?`     | `number`               | 太さ（`wght`。100〜700）                                                                                |
| `filled?`         | `boolean \| number`    | 塗り（`FILL`）。`true` は 1、`false`（既定）は 0。0〜1 の数値も受け付ける                               |
| `grade?`          | `number`               | グレード（`GRAD`。-25〜200）                                                                            |
| `opticalSize?`    | `number`               | 光学サイズ（`opsz`。20〜48）。指定しなければ文字の大きさに合わせて決まる                                |
| `design?`         | `MaterialSymbolDesign` | デザインの値（下の表）。同じ軸のプロパティより強い                                                      |
| `fallbackDesign?` | `MaterialSymbolDesign` | アプリで共通のデザインの値（`withDesign` が渡す）。プロパティと `design` で指定していない軸・状態を補う |

部品の静的なプロパティ:

| プロパティ         | 型                                      | 説明                                                                          |
| ------------------ | --------------------------------------- | ----------------------------------------------------------------------------- |
| `webFonts`         | `readonly FontIconWebFont[]`            | 描くのに要る Web フォント（`[{ family: 'Material Symbols Outlined' }]` など） |
| `designDefinition` | `typeof materialSymbolDesignDefinition` | デザインの定義（react-contract の `withDesign` が読む）                       |
| `displayName`      | `string`                                | `MaterialSymbolOutlined` など                                                 |

#### デザインの値

`design` で渡せるデザインの値です（CSS 変数は `--frg-materialsymbol-` の後にキーを `-` でつないだもの。例: `filled.hover` → `--frg-materialsymbol-filled-hover`）。`hover` の値を指定しなければ、乗ったときは部品の既定の値です（状態なしの値を引き継ぎません）。1つの値は、`hover` にも効きます。

| キー               | 既定値 | 説明                                                       |
| ------------------ | ------ | ---------------------------------------------------------- |
| `fontWeight`       | `400`  | 太さ（`wght`）                                             |
| `fontWeight.hover` | `400`  | 乗ったときの太さ                                           |
| `filled`           | `0`    | 塗り（`FILL`。0〜1。途中の値は、アニメーションの途中の形） |
| `filled.hover`     | `0`    | 乗ったときの塗り                                           |
| `grade`            | `0`    | グレード（`GRAD`）                                         |
| `grade.hover`      | `0`    | 乗ったときのグレード                                       |
| `opticalSize`      | —      | 光学サイズ（`opsz`）。指定したときだけ固定する             |

`design` の値は、[`@fringeworks/react-contract`](https://www.npmjs.com/package/@fringeworks/react-contract) の `createDesignStyle` の規則で書きます。`filled`・`grade`・`opticalSize` は、CSS のプロパティが無い可変フォントの軸のための名前です。

`opticalSize` を CSS 変数で指定するときは、要素に `frg-materialsymbol-opticalSize` のクラスも付けてください。`font-variation-settings` に `opsz` を書くと、文字の大きさに合わせた自動の光学サイズが効かなくなるので、このクラスがあるときだけ `opsz` を書いています（部品の `opticalSize` か `design.opticalSize` を指定すると、部品が付けます）。

### CSS の入口

| 入口                                                      | 説明                                                                                                                                 |
| --------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `styles.css`                                              | アイコンの見た目（react-icon の箱の CSS を含む）。フォントは含まない                                                                 |
| `font-outlined.css`・`font-rounded.css`・`font-sharp.css` | 種類ごとのフォントの読み込み（npm の `material-symbols` の `@font-face`）。Google Fonts や自分で配るフォントを使うときは読み込まない |

### CSS のクラス

| クラス                                                                               | 説明                                                                                                            |
| ------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------- |
| `frg-icon`・`frg-fonticon`                                                           | react-icon のクラス（正方形の箱と、アイコンフォントの指定）                                                     |
| `frg-materialsymbol`                                                                 | Material Symbols のすべてのアイコン。可変フォントの軸を CSS 変数から組み立てる                                  |
| `frg-materialsymboloutlined`・`frg-materialsymbolrounded`・`frg-materialsymbolsharp` | 種類ごとのクラス。種類を選ぶためのもので、CSS の規則は持たない（フォントファミリーは部品が `style` で指定する） |
| `frg-materialsymbol-opticalSize`                                                     | 光学サイズを固定するときに付く                                                                                  |

クラスの規則は詳細度が 0（`:where()`）なので、利用者の CSS でそのまま上書きできます。

### 定数

| 定数                             | 説明                                       |
| -------------------------------- | ------------------------------------------ |
| `materialSymbolDesignDefinition` | 部品のデザインの定義（`designDefinition`） |

### 型

| 型                        | 説明                                                                                                |
| ------------------------- | --------------------------------------------------------------------------------------------------- |
| `MaterialSymbolValue`     | Material Symbols のアイコンの名前（npm の `material-symbols` の型）                                 |
| `MaterialSymbolProps`     | 部品のプロパティ                                                                                    |
| `MaterialSymbolDesign`    | 部品の `design` の値                                                                                |
| `MaterialSymbolComponent` | 部品の型（静的なプロパティを含む）                                                                  |
| `FontIconWebFont`         | `webFonts` の要素（`@fringeworks/react-icon` の型）                                                 |
| `DesignDefinition`        | 部品のデザインの定義（`materialSymbolDesignDefinition` の型）（`@fringeworks/react-contract` の型） |
| `DesignPartDefinition`    | ルートまたは部分の、受け付けるプロパティと効く状態（`@fringeworks/react-contract` の型）            |
| `DesignPropertyValues`    | デザインのプロパティの名前と値の型（`@fringeworks/react-contract` の型）                            |
| `DesignState`             | デザインの値を分ける状態（`@fringeworks/react-contract` の型）                                      |
| `DesignValue<T, S>`       | 1つの値か、状態ごとのオブジェクト（`@fringeworks/react-contract` の型）                             |

## ライセンス

MIT

アイコンの名前の型（`MaterialSymbolValue`）とフォントは、npm の [`material-symbols`](https://github.com/marella/material-symbols) のものを使っています。Material Symbols は Google のもので、どちらも [Apache License, Version 2.0](https://www.apache.org/licenses/LICENSE-2.0) で配布されています。
