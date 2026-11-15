import { PRIVATE, TEST_FILE } from '@fringeworks/dev';
import generateIndexFiles from '@fringeworks/dev/generateIndexFiles';

generateIndexFiles({
  exclude: [
    PRIVATE,
    TEST_FILE,
    // with-css は CSS を読み込むので、ルートからは export しない（`./with-css` から読み込む）
    {
      valueType: 'path',
      conditions: /^src\/with-css$/,
    },
  ],
  // with-css の index は、CSS とフォントの読み込みを読み込み、CSS を含まないルートから export する
  transform: (exports, { indexPath }) => {
    if (indexPath !== 'src/with-css/index.ts') {
      return exports;
    }
    return [
      '// 見た目の CSS と、3つの種類のフォントの読み込みを読み込む（CSS の import を扱えるバンドラーが要る）。',
      '// ブラウザーは描いた種類のフォントだけをダウンロードする',
      "import '../font-outlined.scss';",
      "import '../font-rounded.scss';",
      "import '../font-sharp.scss';",
      "import '../styles.scss';",
      '',
      "export * from '../index';",
    ];
  },
});
