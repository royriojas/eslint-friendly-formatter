describe( 'eslint-friendly-formatter', function () {
  'use strict';

  var expand = require( 'glob-expand' );
  var readJSON = require( 'read-json-sync' );
  var read = require( 'read-file' ).readFileSync;
  //var chalk = require( 'chalk' );
  //var write = require( 'write' ).sync;
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
      },
      './process': {
        env: {
          EFF_NO_GRAY: 'false'
        }
      }
    } );
    var files = expand( path.resolve( __dirname, '../fixtures/**/*.json' ) );

    files.forEach( function ( file ) {
      it( 'should produce the expected output for the given input: ' + path.basename( path.dirname( file ) ), function () {

        var results = readJsonFile( file );
        var output = formatter( results );
        //write(path.join( path.dirname( file ), path.basename( file, '.json' ) + '.txt' ), output);
        var resultText = read( path.join( path.dirname( file ), path.basename( file, '.json' ) + '.txt' ) );
        expect( output ).to.equal( resultText );

      } );
    } );
  } );

  describe( 'no gray', function () {
    var formatter = proxyquire( '../..', {
      path: {},
      './process': {
        env: {
          EFF_NO_GRAY: 'true'
        }
      }
    } );
    var files = expand( path.resolve( __dirname, '../no-gray-fixtures/**/*.json' ) );

    files.forEach( function ( file ) {
      it( 'should produce the expected output for the given input: ' + path.basename( path.dirname( file ) ), function () {

        var results = readJsonFile( file );
        var output = formatter( results );
        //write(path.join( path.dirname( file ), path.basename( file, '.json' ) + '.txt' ), output);
        var resultText = read( path.join( path.dirname( file ), path.basename( file, '.json' ) + '.txt' ) );

        expect( output ).to.equal( resultText );
      } );
    } );
  } );

  describe( 'absolute paths to file', function () {
    var formatter = proxyquire( '../..', {
      path: {
        resolve: function ( args ) {
          return '/home/usr/roy/' + args;
        }
      },
      './process': {
        env: {
          EFF_ABSOLUTE_PATHS: 'true'
        }
      }
    } );
    var files = expand( path.resolve( __dirname, '../absolute-paths/**/*.json' ) );

    files.forEach( function ( file ) {
      it( 'should produce the expected output for the given input: ' + path.basename( path.dirname( file ) ), function () {

        var results = readJsonFile( file );
        var output = formatter( results );
        // var write = require('write').sync;
        // write(path.join( path.dirname( file ), path.basename( file, '.json' ) + '.txt' ), output);
        var resultText = read( path.join( path.dirname( file ), path.basename( file, '.json' ) + '.txt' ) );

        expect( output ).to.equal( resultText );
      } );
    } );
  } );

  describe( 'absolute paths to file, no gray', function () {
    var formatter = proxyquire( '../..', {
      path: {
        resolve: function ( args ) {
          return '/home/usr/roy/' + args;
        }
      },
      './process': {
        env: {
          EFF_ABSOLUTE_PATHS: 'true',
          EFF_NO_GRAY: 'true'
        }
      }
    } );
    var files = expand( path.resolve( __dirname, '../absolute-paths-no-gray/**/*.json' ) );

    files.forEach( function ( file ) {
      it( 'should produce the expected output for the given input: ' + path.basename( path.dirname( file ) ), function () {

        var results = readJsonFile( file );
        var output = formatter( results );
        // var write = require('write').sync;
        // write(path.join( path.dirname( file ), path.basename( file, '.json' ) + '.txt' ), output);
        var resultText = read( path.join( path.dirname( file ), path.basename( file, '.json' ) + '.txt' ) );

        expect( output ).to.equal( resultText );
      } );
    } );
  } );

} );
