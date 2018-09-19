import json from 'rollup-plugin-json';

let version = require('../package.json').version,
  author = require('../package').author.name;

const banner = `/*
 * PoPo ${version}, a JS UI library for data visualization and large screen.
 * https://github.com/shunok/PoPo (c) 2017-2018 ${author}
 */`;

export default {
  entry: 'src/index.js',
  moduleName: 'P',
  format: 'es',
  dest: 'dist/popo.esm.js',
  banner: banner,
  plugins: [
    json(),
  ],
};