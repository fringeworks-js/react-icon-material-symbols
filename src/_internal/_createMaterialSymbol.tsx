import {
  createDesignStyle,
  type DesignStyle,
} from '@fringeworks/react-contract';
import {
  createFontIconProps,
  type FontIconDefinition,
  type FontIconProps,
} from '@fringeworks/react-icon';
import { mergeProps } from '@fringeworks/react-merge';
import { materialSymbolDesignDefinition } from '../constants';
import type { MaterialSymbolComponent, MaterialSymbolProps } from '../types';
import type { MaterialSymbolValue } from './_materialSymbolValue';

/**
 * Material Symbols の種類（フォントファミリーの名前の後ろの部分）
 */
export type MaterialSymbolVariant = 'Outlined' | 'Rounded' | 'Sharp';

const PREFIX = 'frg-materialsymbol';

/**
 * 軸のプロパティを、design と同じ CSS 変数（状態なしの値）にする
 */
function createAxisStyle({
  weight,
  filled,
  grade,
  opticalSize,
}: Pick<
  MaterialSymbolProps,
  'weight' | 'filled' | 'grade' | 'opticalSize'
>): DesignStyle {
  const style: DesignStyle = {};
  if (weight !== undefined) {
    style[`--${PREFIX}-fontWeight`] = String(weight);
  }
  if (filled !== undefined) {
    style[`--${PREFIX}-filled`] = filled ? '1' : '0';
  }
  if (grade !== undefined) {
    style[`--${PREFIX}-grade`] = String(grade);
  }
  if (opticalSize !== undefined) {
    style[`--${PREFIX}-opticalSize`] = String(opticalSize);
  }
  return style;
}

/**
 * Material Symbols の種類ごとの部品を作る
 *
 * - クラスは `frg-icon frg-fonticon`（react-icon）に、`frg-materialsymbol` と種類のクラス（`frg-materialsymboloutlined` など）を足す
 * - 光学サイズを指定したとき（プロパティか design）だけ `frg-materialsymbol-opticalSize` を足す。
 *   `font-variation-settings` に `opsz` を書くと、文字の大きさに合わせた自動の光学サイズが効かなくなるため
 * - 軸の値は design と同じ CSS 変数に書き、プロパティは design の状態なしの値を上書きする
 */
export default function createMaterialSymbol(
  variant: MaterialSymbolVariant,
): MaterialSymbolComponent {
  const fontFamily = `Material Symbols ${variant}`;
  const definition: FontIconDefinition<MaterialSymbolValue> = { fontFamily };

  function MaterialSymbol({
    weight,
    filled,
    grade,
    opticalSize,
    design,
    ...props
  }: MaterialSymbolProps) {
    const fixesOpticalSize =
      opticalSize !== undefined || design?.opticalSize !== undefined;
    const ownProps = {
      className: [
        PREFIX,
        `${PREFIX}${variant.toLowerCase()}`,
        fixesOpticalSize && `${PREFIX}-opticalSize`,
      ],
      style: {
        ...createDesignStyle(PREFIX, materialSymbolDesignDefinition, design),
        ...createAxisStyle({ weight, filled, grade, opticalSize }),
      },
    };
    // 受け取った className・style を後に重ねる（同じプロパティは受け取った値を優先する）
    const merged = mergeProps<
      FontIconProps<MaterialSymbolValue>,
      HTMLSpanElement
    >(ownProps, props) as FontIconProps<MaterialSymbolValue>;
    return <span {...createFontIconProps(definition, merged)} />;
  }

  MaterialSymbol.displayName = `MaterialSymbol${variant}`;
  MaterialSymbol.webFonts = [{ family: fontFamily }] as const;
  MaterialSymbol.designDefinition = materialSymbolDesignDefinition;

  return MaterialSymbol;
}
