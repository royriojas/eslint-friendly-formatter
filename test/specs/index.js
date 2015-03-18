describe( 'eslint-friendly-formatter', function () {
  'use strict';

  var expand = require( 'glob-expand' );
  var readJSON = require( 'read-json-sync' );
  var read = require( 'read-file' ).readFileSync;
  var chalk = require( 'chalk' );
  var path = require( 'path' );
  var proxyquire = require( 'proxyquire' );

  var readJsonFile = function ( file ) {
    try {
      return readJSON( file );
    } catch (ex) {
      return null;
    }
  };

  describe( 'formatter', function () {
    var formatter = proxyquire( '../..', {
      path: {
        resolve: function ( _path ) {
          return _path;
        }
      }
    } );
    var files = expand( path.resolve( __dirname, '../fixtures/**/*.json' ) );

    files.forEach( function ( file ) {
      it( 'should produce the expected output for the given input: ' + path.basename( path.dirname( file ) ), function () {

        var results = readJsonFile( file );
        var output = formatter( results );

        var resultText = read( path.join( path.dirname( file ), path.basename( file, '.json' ) + '.txt' ) );

        expect( chalk.stripColor( output ) ).to.equal( resultText );
      } );
    } );
  } );

} );
