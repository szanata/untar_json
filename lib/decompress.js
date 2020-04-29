const { unzipSync } = require( 'zlib' );
const TimedExecution = require( './_time_execution' );

const firstIndexOf = ( c, ...vars ) => Math.min( ...vars.map( v => c.indexOf( v ) ).filter( n => n > -1 ) );
const lastIndexOf = ( c, ...vars ) => Math.max( ...vars.map( v => c.lastIndexOf( v ) ) );

/**
 * Decompress JSON
 *
 * Reads a gzipped tarball (.tar.gz)
 * 1. Unzip it
 * 2. Convert all to utf-8
 * 3. Split files using the \0star separator
 * 4. Removes control characters
 * 5. Trim files until JSON markup start/end ({}) or ([])
 * 6. JSON parse
 *
 * Enjoy this 100% native tarball decompression!
 * @szanata ;)
 */
module.exports = raw => {
  const decompressionTimer = new TimedExecution();

  const unzipTimer = new TimedExecution();
  const unzip = unzipSync( raw );
  unzipTimer.end();

  const utfStringTimer = new TimedExecution();
  const utfString = unzip.toString( 'utf-8' );
  utfStringTimer.end();
  
  const splitTimer = new TimedExecution();
  const split = utfString.split( '\0ustar' );
  splitTimer.end();

  const sliceTimer = new TimedExecution();
  const slice = split.slice( 1 );
  sliceTimer.end();

  const trimJSONTimer = new TimedExecution();
  const trimmedJSON = slice.map( c =>
    c.substring( firstIndexOf( c, '{', '[' ), lastIndexOf( c, '}', ']' ) + 1 )
  );
  trimJSONTimer.end();

  const jsonParseTimer = new TimedExecution();
  const json = trimmedJSON.map( c => JSON.parse( c ) );
  jsonParseTimer.end();

  decompressionTimer.end();

  console.log({
    'raw_file_size_bytes': Buffer.byteLength( raw ),
    'decompressed_file_size_bytes':  Buffer.byteLength( JSON.stringify( json ) ),
    'unzip': unzipTimer.toJSON(),
    'convert_to_string': utfStringTimer.toJSON(),
    'split': splitTimer.toJSON(),
    'slice': sliceTimer.toJSON(),
    'trim_json': trimJSONTimer.toJSON(),
    'parse_json': jsonParseTimer.toJSON(),
    'total': decompressionTimer.toJSON()
  });

  return json;
};
