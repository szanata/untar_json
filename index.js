const decompress = require( './lib/decompress' );
const { readFileSync } = require( 'fs' );

const compressed = readFileSync( './fixtures/compressed.tar.gz' );

decompress( compressed );

