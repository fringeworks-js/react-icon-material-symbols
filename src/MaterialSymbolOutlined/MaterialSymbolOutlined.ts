import createMaterialSymbol from '../_internal/_createMaterialSymbol';

/**
 * Material Symbols の Outlined のアイコン（フォントファミリーは `Material Symbols Outlined`）
 *
 * `value` でアイコンの名前を受け取り、`<span>` に描く。そのほかの props は `<span>` に渡す（`ref` も `<span>` を指す）。
 *
 * - `weight`・`filled`・`grade`・`opticalSize` と `design` で、可変フォントの軸を変えられる
 * - `aria-label`・`aria-labelledby` が無ければ飾りとして `aria-hidden` を付け、あれば `role="img"` を付ける
 * - 見た目には `@fringeworks/react-icon-material-symbols/styles.css` と、フォントの `@font-face` が要る
 */
const MaterialSymbolOutlined = createMaterialSymbol('Outlined');

export default MaterialSymbolOutlined;
