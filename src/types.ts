import type { Design } from '@fringeworks/react-contract';
import type { FontIconProps, FontIconWebFont } from '@fringeworks/react-icon';
import type { ReactElement } from 'react';
import type { MaterialSymbolValue } from './_internal/_materialSymbolValue';
import type { materialSymbolDesignDefinition } from './constants';

export type { MaterialSymbolValue } from './_internal/_materialSymbolValue';

// 部品の静的なプロパティ webFonts の型。react-icon の createFontIcon の部品と同じ型なので、同じ名前で export する
export type { FontIconWebFont } from '@fringeworks/react-icon';

// デザインの定義（materialSymbolDesignDefinition）と design の値の中の型。
// 利用者が `@fringeworks/react-contract` を入れずに使えるよう、ここから export する
export type {
  DesignDefinition,
  DesignPartDefinition,
  DesignPropertyValues,
  DesignState,
  DesignValue,
} from '@fringeworks/react-contract';

/**
 * Material Symbols の部品のデザインの値
 */
export type MaterialSymbolDesign = Design<
  typeof materialSymbolDesignDefinition
>;

/**
 * Material Symbols の部品のプロパティ
 *
 * `value` でアイコンの名前を受け取る。そのほかの props は `<span>` に渡す。
 */
export type MaterialSymbolProps = FontIconProps<MaterialSymbolValue> & {
  /**
   * 太さ（`wght` の軸。100〜700）。`font-weight` で描く
   */
  weight?: number;

  /**
   * 塗りつぶした形にする（`FILL` の軸）
   * @default false
   */
  filled?: boolean;

  /**
   * グレード（`GRAD` の軸。-25〜200）。太さを変えずに線の濃さを変える
   */
  grade?: number;

  /**
   * 光学サイズ（`opsz` の軸。20〜48）。指定しなければ、ブラウザーが文字の大きさに合わせて決める
   */
  opticalSize?: number;

  /**
   * デザインの値（軸ごとに、`hover` の値も指定できる）。同じ軸のプロパティを指定した場合は、状態なしの値をプロパティで上書きする
   */
  design?: MaterialSymbolDesign;
};

/**
 * Material Symbols の部品（`MaterialSymbolOutlined`・`MaterialSymbolRounded`・`MaterialSymbolSharp`）
 */
export type MaterialSymbolComponent = {
  (props: MaterialSymbolProps): ReactElement;

  /**
   * この部品のアイコンを描くのに要る Web フォント（react-defer-rendering の `useDeferUntilWebFontReady` に渡せる）
   */
  readonly webFonts: readonly FontIconWebFont[];

  /**
   * デザインの定義（react-contract の `withDesign` が読む）
   */
  readonly designDefinition: typeof materialSymbolDesignDefinition;

  displayName?: string;
};
