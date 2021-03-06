const test = require('ava');
const { BinParser, Magic } = require('../index');

test('magic_success', (t) => {
	const buffer = Buffer.from('0d0a', 'hex');
	const result = BinParser([
		Magic('magic', { data: Buffer.from('0d0a', 'hex') }),
	], buffer);

	t.is(result.magic, true);
});

test('magic_fail', (t) => {
	const buffer = Buffer.from('0d0a', 'hex');
	const result = BinParser([
		Magic('magic', { data: Buffer.from('ff00', 'hex') }),
	], buffer);

	t.is(result.magic, false);
});

test('magic_string_success', (t) => {
	const buffer = Buffer.from('48656C6C6F20576F726C64', 'hex');
	const result = BinParser([
		Magic('magic', { data: 'Hello World' }),
	], buffer);

	t.is(result.magic, true);
});
