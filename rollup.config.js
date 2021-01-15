import babel from '@rollup/plugin-babel';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

export default {
	external: ['lodash.pick', 'lodash.pickby'],
	input: './src/index.js',
	output: [
		{
			file: `./lib/cjs/index.js`,
			format: 'cjs',
		},
		{
			file: `./lib/esm/index.js`,
			format: 'esm',
		},
	],
	plugins: [
		peerDepsExternal(),
		nodeResolve({
			extensions: ['.js', '.jsx'],
		}),
		commonjs({
			include: './node_modules/**',
		}),
		babel({
			comments: false,
			configFile: './babel.config.js',
			exclude: './node_modules/**',
		}),
	],
};