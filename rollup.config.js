import dts from 'rollup-plugin-dts';
import typescript from '@rollup/plugin-typescript';

export default [
  {
    input: 'src/Stats.ts',
    output: [
      {
        name: 'Stats',
        file: `build/bundle.js`,
        format: 'umd',
      },
      {
        file: `build/bundle.module.js`,
        sourcemap: true,
        format: 'es',
      },
    ],
    plugins: [typescript()],
  },

  {
    input: `src/Stats.ts`,
    plugins: [dts()],
    output: {
      file: `build/bundle.d.ts`,
      format: 'es',
    },
  },
];
