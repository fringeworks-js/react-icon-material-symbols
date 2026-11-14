// material-symbols のアイコンの名前の型を、src/_internal/_materialSymbolValue.ts に写す
// 型をこのパッケージの d.ts に含めるため、ソースに写して公開する。
// material-symbols を dependencies にしたので、型を直接参照する形にもできる（planning/react-icon/plan.md の IC-13）
// material-symbols を更新したら、このスクリプトを実行してパッチ版を出す
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const packageDir = dirname(require.resolve('material-symbols/package.json'));
const { version } = JSON.parse(
  readFileSync(join(packageDir, 'package.json'), 'utf8'),
) as { version: string };
const source = readFileSync(join(packageDir, 'index.d.ts'), 'utf8');

// index.d.ts は `type MaterialSymbols = [ "123", "360", … ];` の形
const tuple = /type MaterialSymbols = \[([\s\S]*?)\];/.exec(source);
if (!tuple?.[1]) {
  throw new Error('material-symbols の index.d.ts から名前の一覧を読めません');
}
const names = [...tuple[1].matchAll(/"([^"]+)"/g)].map((match) => match[1]!);
if (names.length === 0) {
  throw new Error('material-symbols の index.d.ts に名前がありません');
}

// ライセンスの表示は、d.ts にも残るよう型の JSDoc に書く（ファイルの先頭のコメントは d.ts から落ちる）
const output = `// このファイルは scripts/symbols-update.ts が作ったもの（pnpm symbols:update）。手で書き換えない

/**
 * Material Symbols のアイコンの名前（material-symbols ${version} のもの。${names.length} 個）
 *
 * 名前は material-symbols（https://github.com/marella/material-symbols）の index.d.ts から写した。
 * Material Symbols は Google のもの（https://github.com/google/material-design-icons）。
 * どちらも Apache License, Version 2.0（https://www.apache.org/licenses/LICENSE-2.0）で配布されている。
 */
export type MaterialSymbolValue =
${names.map((name) => `  | '${name}'`).join('\n')};
`;

const target = join(
  dirname(fileURLToPath(import.meta.url)),
  '../src/_internal/_materialSymbolValue.ts',
);
mkdirSync(dirname(target), { recursive: true });
writeFileSync(target, output);
console.log(
  `${names.length} 個の名前を書き出しました（material-symbols ${version}）`,
);
