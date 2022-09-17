import typescript from '@rollup/plugin-typescript';
import scss from 'rollup-plugin-scss';
import {defineConfig} from 'rollup';

export default defineConfig([
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.js',
      format: 'cjs',
    },
    plugins: [
      typescript(),
      scss({
        output: 'dist/index.css',
      }),
    ],
    external: ['react'],
  },
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.esm.js',
      format: 'esm',
    },
    plugins: [
      typescript(),
      scss({
        output: 'dist/index.css',
      }),
    ],
    external: ['react'],
  },
]);
