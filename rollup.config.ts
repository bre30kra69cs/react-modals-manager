import typescript from '@rollup/plugin-typescript';
import {terser} from 'rollup-plugin-terser';
import scss from 'rollup-plugin-scss';
import {defineConfig} from 'rollup';

const isProd = process.env.NODE_ENV === 'production';

export default defineConfig({
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
    },
    {
      file: 'dist/index.esm.js',
      format: 'esm',
    },
  ],
  plugins: [
    typescript(),
    scss({
      output: 'dist/index.css',
    }),
    isProd && terser(),
  ],
  external: ['react'],
});
