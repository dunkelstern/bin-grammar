// Generic Unsigned Integer
//
// size: byte length
// bigEndian: choose big endian encoding, else little endian encoded
// transform: value transformer function gets the parsed value as parameter, returns new value
//
// returns: parser function that returns a transformed unsigned integer
function UInt(name,
	{
		size = 1,
		bigEndian = true,
		transform = value => value,
	} = {}
) {
	if ((size < 1) || (size > 4)) {
		throw new Error('Javascript bit operations are only safe to 32 bits, so we can\'t do sizes over that');
	}

	return function (buffer) {
		let value = 0;

		for (let i = 0; i < size; i += 1) {
			if (bigEndian) {
				value = (value << 8) + buffer[i];
			} else {
				value += buffer[i] << (8 * i);
			}
		}

		return {
			name,
			value: transform(value),
			size,
		};
	};
}

// 8 Bit Unsigned Integer
//
// transform: value transformer function gets the parsed value as parameter, returns new value
//
// returns: parser function that returns a transformed unsigned integer
function UInt8(name, { transform = value => value } = {}) {
	return UInt(name, { size: 1, transform });
}

// 16 Bit Unsigned Integer
//
// bigEndian: choose big endian encoding, else little endian encoded
// transform: value transformer function gets the parsed value as parameter, returns new value
//
// returns: parser function that returns a transformed unsigned integer
function UInt16(name, { bigEndian = true, transform = value => value } = {}) {
	return UInt(name, { size: 2, bigEndian, transform });
}

// 32 Bit Unsigned Integer
//
// bigEndian: choose big endian encoding, else little endian encoded
// transform: value transformer function gets the parsed value as parameter, returns new value
//
// returns: parser function that returns a transformed unsigned integer
function UInt32(name, { bigEndian = true, transform = value => value } = {}) {
	return UInt(name, { size: 4, bigEndian, transform });
}

// export everything
module.exports = {
	UInt,
	UInt8,
	UInt16,
	UInt32,
};
