import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import json from 'rollup-plugin-json';

let version = require('../package.json').version,
    author = require('../package').author.name;

const banner = `/*
 * PoPo ` + version + `, a JS UI library for large screen.
 * https://github.com/shunok/PoPo (c) 2017-2018 ` + author + `
 */`;

export default {
    entry: 'src/index.js',
    moduleName: 'PoPo',
    format: 'umd',
    banner: banner,
    plugins: [
        resolve(),
        commonjs(),
        json(),
        babel({
            exclude: 'node_modules/**',
            presets: ["es2015-rollup"]
        }),
    ],
    // external: [''],
    sourceMap: true
};