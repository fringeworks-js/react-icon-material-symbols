import type { Meta, StoryObj } from '@storybook/react-vite';
// with-css の入口だけを読み込む（見た目の CSS と Rounded のフォントも一緒に読み込まれる）
import { MaterialSymbolRounded } from '../src/with-css/MaterialSymbolRounded';

const meta = {
  title: 'WithCss',
  component: MaterialSymbolRounded,
  args: {
    value: 'favorite',
  },
  decorators: [
    (Story) => (
      <div style={{ padding: 16, fontFamily: 'sans-serif', fontSize: 48 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof MaterialSymbolRounded>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * `with-css/MaterialSymbolRounded` から import するだけで描ける（CSS もフォントも読み込まない）
 */
export const Default: Story = {};
