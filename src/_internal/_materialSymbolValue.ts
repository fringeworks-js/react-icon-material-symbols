import type { MaterialSymbol } from 'material-symbols';

/**
 * Material Symbols のアイコンの名前
 *
 * material-symbols の型をそのまま使う。material-symbols は dependencies なので、
 * 名前は利用者に入っている版のフォントと必ずそろう。
 */
export type MaterialSymbolValue = MaterialSymbol;
