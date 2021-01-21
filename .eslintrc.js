module.exports = {
	root: true,
	extends: '@react-native-community',
	rules: {
		eqeqeq: 0,
		'jsx-quotes': ['error', 'prefer-single'],
		'no-mixed-spaces-and-tabs': 0,
		'object-curly-newline': [
			'off',
			{
				ObjectExpression: 'always',
				ImportDeclaration: 'never',
				ExportDeclaration: 'never',
			},
		],
		'react-native/no-inline-styles': 0,
		semi: ['error', 'never'],
	},
}
