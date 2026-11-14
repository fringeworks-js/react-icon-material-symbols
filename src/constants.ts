import type { DesignDefinition } from '@fringeworks/react-contract';

/**
 * Material Symbols の部品のデザインの定義（受け付けるデザインのプロパティと、効く状態）
 *
 * 可変フォントの軸のうち、CSS のプロパティが無い塗り（`FILL`）・グレード（`GRAD`）・光学サイズ（`opsz`）は、
 * 例外として `filled`・`grade`・`opticalSize` のキーにしている。太さ（`wght`）は CSS の `font-weight` で効くので `fontWeight`。
 * `hover` はアイコン自身の `:hover` に効く。
 */
export const materialSymbolDesignDefinition = {
  properties: {
    fontWeight: ['hover'],
    filled: ['hover'],
    grade: ['hover'],
    opticalSize: [],
  },
} as const satisfies DesignDefinition;
