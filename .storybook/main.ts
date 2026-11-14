import type { StorybookConfig } from '@storybook/react-vite';
import { createRequire } from 'node:module';
import path from 'node:path';

// フォントの読み込みの入口（src/font-*.scss）が参照する material-symbols の場所。
// ワークスペースのルートの node_modules にあり、Storybook がファイルを配れる範囲（server.fs.allow）の外になるため、範囲に足す
const materialSymbolsDir = path.dirname(
  createRequire(import.meta.url).resolve('material-symbols/package.json'),
);

const config: StorybookConfig = {
  stories: [
    '../stories/**/*.mdx',
    '../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    '@chromatic-com/storybook',
    '@storybook/addon-vitest',
    '@storybook/addon-a11y',
    '@storybook/addon-docs',
    '@storybook/addon-onboarding',
  ],
  framework: '@storybook/react-vite',
  viteFinal: (viteConfig) => ({
    ...viteConfig,
    server: {
      ...viteConfig.server,
      fs: {
        ...viteConfig.server?.fs,
        allow: [...(viteConfig.server?.fs?.allow ?? []), materialSymbolsDir],
      },
    },
  }),
};
export default config;
