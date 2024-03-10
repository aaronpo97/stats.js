import typescript from '@rollup/plugin-typescript';

export default {
  input: 'src/Stats.ts',
  output: [
    {
      format: 'umd',
      name: 'Stats',
      file: 'build/stats.js',
      indent: '\t',
    },
    {
      format: 'es',
      name: 'Stats',
      file: 'build/stats.module.js',
      indent: '\t',
    },
  ],
  plugins: [typescript()],
};
