import { withDesign } from '@fringeworks/react-contract';
import { render } from '@testing-library/react';
import { createRef } from 'react';
import MaterialSymbolOutlined from '../MaterialSymbolOutlined';
import MaterialSymbolRounded from '../MaterialSymbolRounded';
import MaterialSymbolSharp from '../MaterialSymbolSharp';

function renderSpan(element: React.ReactElement) {
  const { container } = render(element);
  const span = container.querySelector('span');
  if (!span) {
    throw new Error('span が描かれていない');
  }
  return span;
}

describe('createMaterialSymbol', () => {
  it('名前を合字の文字として、種類のフォントファミリーの span に描く', () => {
    const span = renderSpan(<MaterialSymbolOutlined value="home" />);
    expect(span.textContent).toBe('home');
    expect(span.className).toBe(
      'frg-icon frg-fonticon frg-materialsymbol frg-materialsymboloutlined',
    );
    expect(span.style.fontFamily).toBe('"Material Symbols Outlined"');
    expect(span.getAttribute('aria-hidden')).toBe('true');
  });

  it.each([
    [MaterialSymbolOutlined, 'Outlined'],
    [MaterialSymbolRounded, 'Rounded'],
    [MaterialSymbolSharp, 'Sharp'],
  ])('種類ごとの名前と webFonts を持つ（%#）', (Component, variant) => {
    expect(Component.displayName).toBe(`MaterialSymbol${variant}`);
    expect(Component.webFonts).toEqual([
      { family: `Material Symbols ${variant}` },
    ]);
    const span = renderSpan(<Component value="search" />);
    expect(span.classList).toContain(
      `frg-materialsymbol${variant.toLowerCase()}`,
    );
    expect(span.style.fontFamily).toBe(`"Material Symbols ${variant}"`);
  });

  it('軸のプロパティを CSS 変数に書く', () => {
    const span = renderSpan(
      <MaterialSymbolOutlined
        value="home"
        fontWeight={300}
        filled
        grade={-25}
      />,
    );
    expect(span.style.getPropertyValue('--frg-materialsymbol-fontWeight')).toBe(
      '300',
    );
    expect(span.style.getPropertyValue('--frg-materialsymbol-filled')).toBe(
      '1',
    );
    expect(span.style.getPropertyValue('--frg-materialsymbol-grade')).toBe(
      '-25',
    );
    // プロパティはすべての状態に効く
    expect(
      span.style.getPropertyValue('--frg-materialsymbol-fontWeight-hover'),
    ).toBe('300');
    expect(
      span.style.getPropertyValue('--frg-materialsymbol-filled-hover'),
    ).toBe('1');
    // 光学サイズを指定していないときは、opsz を書くクラスを付けない
    expect(span.classList).not.toContain('frg-materialsymbol-opticalSize');
  });

  it('filled の数値は、そのまま書く', () => {
    const span = renderSpan(
      <MaterialSymbolOutlined value="home" filled={0.5} />,
    );
    expect(span.style.getPropertyValue('--frg-materialsymbol-filled')).toBe(
      '0.5',
    );
  });

  it('filled={false} は 0 を書く', () => {
    const span = renderSpan(
      <MaterialSymbolOutlined value="home" filled={false} />,
    );
    expect(span.style.getPropertyValue('--frg-materialsymbol-filled')).toBe(
      '0',
    );
  });

  it('光学サイズを指定したときだけ、opsz を書くクラスを付ける', () => {
    const fromProp = renderSpan(
      <MaterialSymbolOutlined value="home" opticalSize={48} />,
    );
    expect(fromProp.classList).toContain('frg-materialsymbol-opticalSize');
    expect(
      fromProp.style.getPropertyValue('--frg-materialsymbol-opticalSize'),
    ).toBe('48');

    const fromDesign = renderSpan(
      <MaterialSymbolOutlined value="home" design={{ opticalSize: 20 }} />,
    );
    expect(fromDesign.classList).toContain('frg-materialsymbol-opticalSize');
  });

  it('design の値を、状態ごとの CSS 変数に書く', () => {
    const span = renderSpan(
      <MaterialSymbolOutlined
        value="home"
        design={{ filled: { hover: 1 }, fontWeight: 500 }}
      />,
    );
    expect(span.style.getPropertyValue('--frg-materialsymbol-filled')).toBe('');
    expect(
      span.style.getPropertyValue('--frg-materialsymbol-filled-hover'),
    ).toBe('1');
    expect(span.style.getPropertyValue('--frg-materialsymbol-fontWeight')).toBe(
      '500',
    );
    expect(
      span.style.getPropertyValue('--frg-materialsymbol-fontWeight-hover'),
    ).toBe('500');
  });

  it('design の状態ごとの値はプロパティより強く、省略した状態はプロパティの値', () => {
    const span = renderSpan(
      <MaterialSymbolOutlined
        value="home"
        fontWeight={300}
        design={{ fontWeight: { hover: 700 } }}
      />,
    );
    expect(span.style.getPropertyValue('--frg-materialsymbol-fontWeight')).toBe(
      '300',
    );
    expect(
      span.style.getPropertyValue('--frg-materialsymbol-fontWeight-hover'),
    ).toBe('700');
  });

  it('design の1つの値は、プロパティをすべての状態で上書きする', () => {
    const span = renderSpan(
      <MaterialSymbolOutlined
        value="home"
        filled={false}
        design={{ filled: 1 }}
      />,
    );
    expect(span.style.getPropertyValue('--frg-materialsymbol-filled')).toBe(
      '1',
    );
    expect(
      span.style.getPropertyValue('--frg-materialsymbol-filled-hover'),
    ).toBe('1');
  });

  it('design の base だけを指定したときは、hover の変数を書かない（部品の既定の値になる）', () => {
    const span = renderSpan(
      <MaterialSymbolOutlined
        value="home"
        design={{ fontWeight: { base: 700 } }}
      />,
    );
    expect(span.style.getPropertyValue('--frg-materialsymbol-fontWeight')).toBe(
      '700',
    );
    expect(
      span.style.getPropertyValue('--frg-materialsymbol-fontWeight-hover'),
    ).toBe('');
  });

  it('受け取った className・style を後に重ね、同じプロパティは受け取った値を優先する', () => {
    const span = renderSpan(
      <MaterialSymbolOutlined
        value="home"
        filled
        className="app-icon"
        style={
          {
            fontSize: 32,
            '--frg-materialsymbol-filled': '0.5',
          } as React.CSSProperties
        }
      />,
    );
    expect(span.classList).toContain('app-icon');
    expect(span.className.endsWith('app-icon')).toBe(true);
    expect(span.style.fontSize).toBe('32px');
    expect(span.style.getPropertyValue('--frg-materialsymbol-filled')).toBe(
      '0.5',
    );
  });

  it('aria-label を渡すと画像として読み上げられる', () => {
    const { getByRole } = render(
      <MaterialSymbolOutlined value="home" aria-label="ホーム" />,
    );
    expect(getByRole('img', { name: 'ホーム' }).textContent).toBe('home');
  });

  it('ref は span を指す', () => {
    const ref = createRef<HTMLSpanElement>();
    render(<MaterialSymbolOutlined value="home" ref={ref} />);
    expect(ref.current?.tagName).toBe('SPAN');
  });

  it('withDesign で既定の design を重ねられる', () => {
    const HoverFilled = withDesign(MaterialSymbolOutlined, {
      filled: { hover: 1 },
    });
    const span = renderSpan(<HoverFilled value="home" />);
    expect(
      span.style.getPropertyValue('--frg-materialsymbol-filled-hover'),
    ).toBe('1');
  });

  it('プロパティは withDesign の値より強い。プロパティで指定していない軸は withDesign の値', () => {
    const AppSymbol = withDesign(MaterialSymbolOutlined, {
      fontWeight: { base: 700, hover: 700 },
      filled: { hover: 1 },
    });
    const span = renderSpan(<AppSymbol value="home" fontWeight={200} />);
    expect(span.style.getPropertyValue('--frg-materialsymbol-fontWeight')).toBe(
      '200',
    );
    expect(
      span.style.getPropertyValue('--frg-materialsymbol-fontWeight-hover'),
    ).toBe('200');
    expect(
      span.style.getPropertyValue('--frg-materialsymbol-filled-hover'),
    ).toBe('1');
  });

  it('withDesign の光学サイズでも、opsz を書くクラスを付ける', () => {
    const AppSymbol = withDesign(MaterialSymbolOutlined, { opticalSize: 20 });
    expect(renderSpan(<AppSymbol value="home" />).classList).toContain(
      'frg-materialsymbol-opticalSize',
    );
  });
});
