import { withDesign } from '@fringeworks/react-contract';
import type { Meta, StoryObj } from '@storybook/react-vite';
import type { CSSProperties } from 'react';
import {
  MaterialSymbolOutlined,
  MaterialSymbolRounded,
  MaterialSymbolSharp,
} from '../src';
import '../src/font-outlined.scss';
import '../src/font-rounded.scss';
import '../src/font-sharp.scss';
import '../src/styles.scss';

const meta = {
  title: 'MaterialSymbol',
  component: MaterialSymbolOutlined,
  args: {
    value: 'home',
  },
  argTypes: {
    filled: { control: 'boolean' },
    fontWeight: { control: { type: 'range', min: 100, max: 700, step: 100 } },
    grade: { control: { type: 'range', min: -25, max: 200, step: 25 } },
    opticalSize: { control: { type: 'range', min: 20, max: 48, step: 4 } },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: 16, fontFamily: 'sans-serif', fontSize: 14 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof MaterialSymbolOutlined>;

export default meta;
type Story = StoryObj<typeof meta>;

const row: CSSProperties = { display: 'flex', alignItems: 'center', gap: 16 };
const grid: CSSProperties = { display: 'grid', gap: 12 };

// アプリで共通の値を決めた部品（Layers で使う）
const AppSymbol = withDesign(MaterialSymbolOutlined, {
  fontWeight: { base: 700, hover: 700 },
  filled: { hover: 1 },
});

/**
 * 大きさは親の `font-size` を継承する（この例は 48px の中に置いている）
 */
export const Default: Story = {
  decorators: [
    (Story) => (
      <div style={{ fontSize: 48 }}>
        <Story />
      </div>
    ),
  ],
};

/**
 * 3つの種類（Outlined・Rounded・Sharp）は別の部品
 */
export const Variants: Story = {
  render: (args) => (
    <div style={{ ...row, fontSize: 40 }}>
      <MaterialSymbolOutlined {...args} />
      <MaterialSymbolRounded {...args} />
      <MaterialSymbolSharp {...args} />
    </div>
  ),
};

/**
 * 大きさの継承（IC-9b）: 文の中・見出し・ボタンの中で、文字の大きさに合わせて並ぶ。
 * 付属のクラス（`.material-symbols-outlined`）は使わず、24px に固定しない（IC-9a）
 */
export const InheritedSize: Story = {
  render: (args) => (
    <div style={grid}>
      <p style={{ margin: 0 }}>
        14px の文の中の <MaterialSymbolOutlined {...args} /> アイコン
      </p>
      <h2 style={{ margin: 0 }}>
        <MaterialSymbolOutlined {...args} /> 24px の見出し
      </h2>
      <div>
        <button
          type="button"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            fontSize: 14,
          }}
        >
          <MaterialSymbolOutlined value="save" />
          保存
        </button>
      </div>
      <p style={{ margin: 0, fontSize: 24 }}>
        24px にしたいとき: <MaterialSymbolOutlined {...args} />
      </p>
    </div>
  ),
};

/**
 * 可変フォントの軸。太さ（`fontWeight`）・グレード（`grade`）・塗り（`filled`）・光学サイズ（`opticalSize`）
 */
export const Axes: Story = {
  render: (args) => (
    <div style={{ ...grid, fontSize: 40 }}>
      <div style={row}>
        {[100, 200, 300, 400, 500, 600, 700].map((fontWeight) => (
          <MaterialSymbolOutlined
            key={fontWeight}
            {...args}
            fontWeight={fontWeight}
          />
        ))}
      </div>
      <div style={row}>
        {[-25, 0, 200].map((grade) => (
          <MaterialSymbolOutlined key={grade} {...args} grade={grade} />
        ))}
      </div>
      <div style={row}>
        <MaterialSymbolOutlined {...args} filled={false} />
        <MaterialSymbolOutlined {...args} filled={0.5} />
        <MaterialSymbolOutlined {...args} filled />
      </div>
      <div style={row}>
        <MaterialSymbolOutlined {...args} />
        {[20, 24, 40, 48].map((opticalSize) => (
          <MaterialSymbolOutlined
            key={opticalSize}
            {...args}
            opticalSize={opticalSize}
          />
        ))}
      </div>
    </div>
  ),
};

/**
 * プロパティ・`design`・`withDesign` の重なり方。
 * 使う場所の `design` ＞ プロパティ ＞ `withDesign`（`fallbackDesign`）の順に強い。アイコンに乗って確かめる
 */
export const Layers: Story = {
  render: (args) => (
    <div style={{ ...grid, fontSize: 48 }}>
      <div style={row}>
        {/* 300。乗っても 300 */}
        <MaterialSymbolOutlined {...args} fontWeight={300} />
        {/* 300。乗ると 700 */}
        <MaterialSymbolOutlined
          {...args}
          fontWeight={300}
          design={{ fontWeight: { hover: 700 } }}
        />
        {/* 700。乗ると既定の 400 */}
        <MaterialSymbolOutlined
          {...args}
          design={{ fontWeight: { base: 700 } }}
        />
      </div>
      <div style={row}>
        {/* withDesign の 700。乗ると塗る */}
        <AppSymbol {...args} />
        {/* プロパティの 200 が withDesign より強い。乗っても 200 で、塗りは withDesign のまま */}
        <AppSymbol {...args} fontWeight={200} />
      </div>
    </div>
  ),
};

/**
 * `design` で、アイコンに乗ったときの塗り・太さを変える
 */
export const HoverWithDesign: Story = {
  args: {
    design: { filled: { hover: 1 }, fontWeight: { hover: 600 } },
  },
  decorators: [
    (Story) => (
      <div style={{ fontSize: 48 }}>
        <Story />
      </div>
    ),
  ],
};

/**
 * 親に乗ったときに変えるのは、利用者が CSS で書く（`.button:hover { --frg-materialsymbol-filled: 1; --frg-materialsymbol-filled-hover: 1 }`）。アイコン自身に乗ったときの値（`-hover`）も書かないと、アイコンの上で既定の値に戻る
 */
export const ParentHover: Story = {
  render: (args) => (
    <>
      <style>
        {
          '.story-favorite:hover { --frg-materialsymbol-filled: 1; --frg-materialsymbol-filled-hover: 1; color: #d81b60; }'
        }
      </style>
      <button
        type="button"
        className="story-favorite"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          fontSize: 16,
        }}
      >
        <MaterialSymbolOutlined {...args} value="favorite" />
        お気に入り
      </button>
    </>
  ),
};
