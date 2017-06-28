import babel from 'rollup-plugin-babel';
import nodeResolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';
import commonjs from 'rollup-plugin-commonjs';
import Visualizer from 'rollup-plugin-visualizer';

const entries = {
  min: 'lib/index.js',
  umd: 'lib/index.js',
};

const dests = {
  min: 'dist/react-hyperlist.min.js',
  umd: 'dist/react-hyperlist.js',
}

const { NODE_ENV = 'umd' } = process.env;

export const context = 'this';
export const exports = 'default';
export const entry = entries[NODE_ENV];
export const sourceMap = false;
export const moduleName = 'HyperList';
export const globals = { react: 'React' };
export const external = ['react'];

export const targets = [{
  dest: dests[NODE_ENV],
  format: 'umd',
}];

export const plugins = [
  NODE_ENV === 'min' && replace({ 'process.env.NODE_ENV': JSON.stringify('production') }),
  babel({ exclude: 'node_modules/**' }),
  nodeResolve({ jsnext: true }),
  commonjs({ include: 'node_modules/**' }),
  NODE_ENV === 'umd' && Visualizer({ filename: './dist/hyperlist-build-size.html' }),
].filter(Boolean);
