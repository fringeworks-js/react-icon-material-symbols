// 見た目の CSS と、3つの種類のフォントの読み込みを読み込む（CSS の import を扱えるバンドラーが要る）。
// ブラウザーは描いた種類のフォントだけをダウンロードする
import '../font-outlined.scss';
import '../font-rounded.scss';
import '../font-sharp.scss';
import '../styles.scss';

export * from '../index';
