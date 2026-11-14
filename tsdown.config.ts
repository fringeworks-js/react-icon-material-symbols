import createTsdownConfig from '@fringeworks/dev/createTsdownConfig';

export default createTsdownConfig({
  css: true,
  exports: {
    extraExports: {
      './styles.css': './styles.css',
      // フォントの読み込みの入口（種類ごと）。styles.css には含めず、利用者が配り方を選べるようにする
      './font-outlined.css': './font-outlined.css',
      './font-rounded.css': './font-rounded.css',
      './font-sharp.css': './font-sharp.css',
    },
  },
});
