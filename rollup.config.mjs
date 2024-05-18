import terser from '@rollup/plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import dts from 'rollup-plugin-dts';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import pkg from './package.json' assert { type: 'json' };

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({ tsconfig: './tsconfig.json' }),
      terser(),
      postcss(),
    ],
  },
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/index.d.ts',
        format: 'cjs',
      },
    ],
    plugins: [
      dts(),
    ],
    external: [/\.css$/],
  },
  {
    input: 'src/templates/index.ts',
    output: [
      {
        file: 'dist/templates.js',
        format: 'cjs',
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({ tsconfig: './tsconfig.json' }),
      terser(),
      postcss(),
    ],
  },
  {
    input: 'src/templates/index.ts',
    output: [
      {
        file: 'dist/templates.d.ts',
        format: 'cjs',
      },
    ],
    plugins: [
      dts(),
    ],
    external: [/\.css$/],
  },
];
