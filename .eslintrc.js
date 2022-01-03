module.exports = {
	'env': {
		'browser': true,
		'es2021': true
	},
	'extends': [
		'react-app',
		'plugin:react/recommended',
		'plugin:@typescript-eslint/eslint-recommended',
		'prettier',
	],
	'plugins': [
		'prettier'
	],
	'rules': {
		'react/prop-types': [ 'off' ],
		'react/no-unescaped-entities': [ 'off' ],
		'react/display-name': [ 'off' ],
		'react/no-find-dom-node': [ 'off' ],
		'react/jsx-curly-brace-presence': [ 'off', { props: "never", children: "never" } ],
		'react/jsx-filename-extension': [ 'off' ],
		'react/jsx-curly-spacing': [ 'off', { 'when': 'always', 'children': true } ],
		'indent': [
			'off',
			2,
			{
				'SwitchCase': 1,
				'VariableDeclarator': 2,
				'FunctionDeclaration': { 'body': 1, 'parameters': 2 },
				'FunctionExpression': { 'body': 1, 'parameters': 2 },
				'CallExpression': { 'arguments': 'first' },
				'ArrayExpression': 1,
				'ObjectExpression': 1,
				'ImportDeclaration': 1,
				'flatTernaryExpressions': false,
				'offsetTernaryExpressions': true,
				'ignoreComments': false
			}
		],
		'quotes': [ 'off', 'single', { 'avoidEscape': true } ],
		'semi': [ 'off', 'never' ],
		'react/jsx-indent-props': [ 0, 'tab' ],
		'no-unused-vars': [
			'error',
			{
				'vars': 'all',
				'args': 'none',
				'ignoreRestSiblings': true
			}
		],
		'brace-style': [ 'off', '1tbs', { 'allowSingleLine': false }, 'stroustrup' ],
		'object-curly-spacing': [ 'off', 'always' ],
		'array-bracket-spacing': [
			'off',
			'always',
			{ 'singleValue': true, 'objectsInArrays': false, 'arraysInArrays': false },
		],
		'block-spacing': [ 'off', 'always' ],
		'no-empty': [ 'warn', { 'allowEmptyCatch': true } ],
		'curly': [ 'off', 'all' ],
		'eqeqeq': [ 'error', 'always', { 'null': 'ignore' } ],
		'no-else-return': [ 'off' ],
		'no-empty-function': [ 'off' ],
		'no-multi-spaces': [ 'warn', { 'exceptions': { 'Property': true, 'VariableDeclarator': true } } ],
		'no-delete-var': [ 'error' ],
	}
}
