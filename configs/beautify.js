var esformatter = require( 'esformatter' );
var expand = require( 'glob-expand' );
var readJSON = require( 'read-json-sync' );
var path = require( 'path' );
var read = require( 'read-file' ).readFileSync;
var write = require( 'write' ).sync;

var fBefore = [
  '../index.js',
  '../test/**/*.js',
  '../configs/*.js'
].map( function ( file ) {
  return path.resolve( __dirname, file );
} );

var files = expand.apply( null, fBefore );

var cfg = readJSON( path.resolve( __dirname, './esformatter.json' ) );

//console.log('files', files);

files.forEach( function ( file ) {
  var output = esformatter.format( read( file ), cfg );
  try {
    write( file, output );
    console.log( 'beautified file', file );
  } catch (ex) {
    console.error( 'error trying to format file', file, ex.message );
  }
} );
