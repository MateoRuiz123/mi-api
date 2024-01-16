const {
	resolve
} = require('path');

module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	testMatch: ['*/.steps.ts', '*/.test.ts'],
	collectCoverageFrom: ['src/*/.ts'],
	transform: {
		'^.+\\.ts?$': 'ts-jest',
	},
	transformIgnorePatterns: [
		"node_modules/(?!variables/.*)"
	]
};