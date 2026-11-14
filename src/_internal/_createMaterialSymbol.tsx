import {
  createDesignStyle,
  createEffectiveDesign,
} from '@fringeworks/react-contract';
import {
  createFontIconProps,
  type FontIconDefinition,
  type FontIconProps,
} from '@fringeworks/react-icon';
import { mergeProps } from '@fringeworks/react-merge';
import { materialSymbolDesignDefinition } from '../constants';
import type {
  MaterialSymbolComponent,
  MaterialSymbolDesign,
  MaterialSymbolProps,
} from '../types';
import type { MaterialSymbolValue } from './_materialSymbolValue';

/**
 * Material Symbols の種類（フォントファミリーの名前の後ろの部分）
 */
export type MaterialSymbolVariant = 'Outlined' | 'Rounded' | 'Sharp';

const PREFIX = 'frg-materialsymbol';

/**
 * 軸のプロパティを、design と同じ形の値にする（1つの値として、すべての状態に効く）
 */
function createPropsDesign({
  fontWeight,
  filled,
  grade,
  opticalSize,
}: Pick<
  MaterialSymbolProps,
  'fontWeight' | 'filled' | 'grade' | 'opticalSize'
>): MaterialSymbolDesign {
  return {
    fontWeight,
    // 真偽値は 0・1 に、数値（0〜1）はそのまま
    filled: filled === undefined ? undefined : Number(filled),
    grade,
    opticalSize,
  };
}

export default function createMaterialSymbol(
  variant: MaterialSymbolVariant,
): MaterialSymbolComponent {
  const fontFamily = `Material Symbols ${variant}`;
  const definition: FontIconDefinition<MaterialSymbolValue> = { fontFamily };

  function MaterialSymbol({
    fontWeight,
    filled,
    grade,
    opticalSize,
    design,
    fallbackDesign,
    ...props
  }: MaterialSymbolProps) {
    const effectiveDesign = createEffectiveDesign(
      materialSymbolDesignDefinition,
      {
        design,
        propsDesign: createPropsDesign({
          fontWeight,
          filled,
          grade,
          opticalSize,
        }),
        fallbackDesign,
      },
    );
    const fixesOpticalSize = effectiveDesign.opticalSize !== undefined;
    const ownProps = {
      className: [
        PREFIX,
        `${PREFIX}${variant.toLowerCase()}`,
        fixesOpticalSize && `${PREFIX}-opticalSize`,
      ],
      style: createDesignStyle(
        PREFIX,
        materialSymbolDesignDefinition,
        effectiveDesign,
      ),
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
