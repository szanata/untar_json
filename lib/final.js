const { unzipSync } = require( 'zlib' );

/**
 * Decompress JSON
 *
 * Reads a gzipped tarball (.tar.gz)
 * 1. Unzip it
 * 2. Convert all to utf-8
 * 3. Split files using the \0star separator
 * 4. Trim files until JSON markup start/end ({})
 * 5. JSON parse
 *
 * Enjoy this 100% native tarball decompression!
 * @szanata ;)
 */
module.exports = raw => //{
  unzipSync( raw )
    .toString( 'utf-8' )
    .split( '\0ustar' )
    .slice( 1 )
    .map( c =>
      JSON.parse( c.substring( c.indexOf( '{' ), c.lastIndexOf( '}' ) + 1 ) )
    );
