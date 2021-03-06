module.exports = {
	presets: [
		[
			'@babel/preset-env',
			{
				targets: {
					node: 'current',
				},
			},
		],
	],
	plugins: [
		['module-resolver', { root: ['./src'] }],
		'transform-optional-chaining',
		'@babel/proposal-async-generator-functions',
		'@babel/proposal-class-properties',
	],
};