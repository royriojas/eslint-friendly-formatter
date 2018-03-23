var chai = require('chai');
var chaiJestSnapshot = require('chai-jest-snapshot');
var expand = require('glob-expand');
var readJSON = require('read-json-sync');

var path = require('path');
var proxyquire = require('proxyquire');


chai.use(chaiJestSnapshot);

before(function() {
  chaiJestSnapshot.resetSnapshotRegistry();
});

beforeEach(function() {
  chaiJestSnapshot.configureUsingMochaContext(this);
});

var expect = chai.expect;

describe('eslint-friendly-formatter', function() {

  var readJsonFile = function(file) {
    try {
      return readJSON(file);
    } catch (ex) {
      return null;
    }
  };

  describe('formatter', function() {
    var formatter = proxyquire('../..', {
      path: {
      },
      './process': {
        env: {
          EFF_NO_GRAY: 'false'
        },
        cwd: function cwd() {
          return '/path/to/working/directory';
        }
      }
    });
    var files = expand(path.resolve(__dirname, '../fixtures/**/*.json'));

    files.forEach(function(file) {
      it('should produce the expected output for the given input: ' + path.basename(path.dirname(file)), function() {

        var results = readJsonFile(file);
        var output = formatter(results);
        expect(output).to.matchSnapshot();
        // write(path.join( path.dirname( file ), path.basename( file, '.json' ) + '.txt' ), output);
        // var resultText = read(path.join(path.dirname(file), path.basename(file, '.json') + '.txt'));
        // expect(output).to.equal(resultText);

      });
    });
  });

  describe('no gray', function() {
    var formatter = proxyquire('../..', {
      path: {},
      './process': {
        env: {
          EFF_NO_GRAY: 'true'
        },
        cwd: function cwd() {
          return '/path/to/working/directory';
        }
      }
    });
    var files = expand(path.resolve(__dirname, '../no-gray-fixtures/**/*.json'));

    files.forEach(function(file) {
      it('should produce the expected output for the given input: ' + path.basename(path.dirname(file)), function() {

        var results = readJsonFile(file);
        var output = formatter(results);
        expect(output).to.matchSnapshot();
      // write(path.join( path.dirname( file ), path.basename( file, '.json' ) + '.txt' ), output);
      // var resultText = read(path.join(path.dirname(file), path.basename(file, '.json') + '.txt'));
      // expect(output).to.equal(resultText);
      });
    });
  });

  describe('absolute paths to file', function() {
    var formatter = proxyquire('../..', {
      path: {
        resolve: function(args) {
          return '/home/usr/roy/' + args;
        }
      },
      './process': {
        env: {
          EFF_ABSOLUTE_PATHS: 'true'
        },
        cwd: function cwd() {
          return '/path/to/working/directory';
        }
      }
    });
    var files = expand(path.resolve(__dirname, '../absolute-paths/**/*.json'));

    files.forEach(function(file) {
      it('should produce the expected output for the given input: ' + path.basename(path.dirname(file)), function() {

        var results = readJsonFile(file);
        var output = formatter(results);
        expect(output).to.matchSnapshot();
      // write(path.join( path.dirname( file ), path.basename( file, '.json' ) + '.txt' ), output);
      // var resultText = read(path.join(path.dirname(file), path.basename(file, '.json') + '.txt'));
      // expect(output).to.equal(resultText);
      });
    });
  });

  describe('scheme', function() {
    var formatter = proxyquire('../..', {
      path: {
        resolve: function(args) {
          return '/home/usr/roy/' + args;
        }
      },
      './process': {
        env: {
          EFF_ABSOLUTE_PATHS: 'true',
          EFF_EDITOR_SCHEME: 'editor://open?file={file}&line={line}&column={column}'
        },
        cwd: function cwd() {
          return '/path/to/working/directory';
        }
      }
    });
    var files = expand(path.resolve(__dirname, '../scheme/**/*.json'));

    files.forEach(function(file) {
      it('should produce the expected output for the given input: ' + path.basename(path.dirname(file)), function() {

        var results = readJsonFile(file);
        var output = formatter(results);
        expect(output).to.matchSnapshot();
      // write(path.join( path.dirname( file ), path.basename( file, '.json' ) + '.txt' ), output);
      // var resultText = read(path.join(path.dirname(file), path.basename(file, '.json') + '.txt'));
      // expect(output).to.equal(resultText);
      });
    });
  });

  describe('absolute paths to file, no gray', function() {
    var formatter = proxyquire('../..', {
      path: {
        resolve: function(args) {
          return '/home/usr/roy/' + args;
        }
      },
      './process': {
        env: {
          EFF_ABSOLUTE_PATHS: 'true',
          EFF_NO_GRAY: 'true'
        },
        cwd: function cwd() {
          return '/path/to/working/directory';
        }
      }
    });
    var files = expand(path.resolve(__dirname, '../absolute-paths-no-gray/**/*.json'));

    files.forEach(function(file) {
      it('should produce the expected output for the given input: ' + path.basename(path.dirname(file)), function() {

        var results = readJsonFile(file);
        var output = formatter(results);
        expect(output).to.matchSnapshot();
      // write(path.join( path.dirname( file ), path.basename( file, '.json' ) + '.txt' ), output);
      // var resultText = read(path.join(path.dirname(file), path.basename(file, '.json') + '.txt'));
      // expect(output).to.equal(resultText);
      });
    });
  });

  describe('no links to rules', function() {
    var formatter = proxyquire('../..', {
      path: {
        resolve: function(args) {
          return '/home/usr/roy/' + args;
        }
      },
      './process': {
        env: {
          EFF_NO_LINK_RULES: 'true'
        },
        cwd: function cwd() {
          return '/path/to/working/directory';
        }
      }
    });
    var files = expand(path.resolve(__dirname, '../no-links/**/*.json'));

    files.forEach(function(file) {
      it('should produce the expected output for the given input: ' + path.basename(path.dirname(file)), function() {

        var results = readJsonFile(file);
        var output = formatter(results);
        expect(output).to.matchSnapshot();
      // write(path.join( path.dirname( file ), path.basename( file, '.json' ) + '.txt' ), output);
      // var resultText = read(path.join(path.dirname(file), path.basename(file, '.json') + '.txt'));
      // expect(output).to.equal(resultText);
      });
    });
  });

  describe('custom rules links open google search', function() {
    var formatter = proxyquire('../..', {
      path: {
        resolve: function(args) {
          return '/home/usr/roy/' + args;
        }
      },
      './process': {
        env: {
          EFF_NO_LINK_RULES: 'false'
        },
        cwd: function cwd() {
          return '/path/to/working/directory';
        }
      }
    });
    var files = expand(path.resolve(__dirname, '../plugin-rules/**/*.json'));

    files.forEach(function(file) {
      it('should produce the expected output for the given input: ' + path.basename(path.dirname(file)), function() {

        var results = readJsonFile(file);
        var output = formatter(results);
        expect(output).to.matchSnapshot();
      // var write = require( 'write' ).sync;
      // write(path.join( path.dirname( file ), path.basename( file, '.json' ) + '.txt' ), output);
      // var resultText = read(path.join(path.dirname(file), path.basename(file, '.json') + '.txt'));
      // expect(output).to.equal(resultText);
      });
    });
  });

  describe('--eff-filter option', function() {
    var formatter = proxyquire('../..', {
      path: {
        resolve: function(args) {
          return '/home/usr/roy/' + args;
        }
      },
      './process': {
        argv: ['--', '--eff-filter', 'no-unused-vars'],
        cwd: function cwd() {
          return '/path/to/working/directory';
        }
      }
    });
    var files = expand(path.resolve(__dirname, '../filter/**/*.json'));

    files.forEach(function(file) {
      it('should produce the expected output for the given input: ' + path.basename(path.dirname(file)), function() {

        var results = readJsonFile(file);
        var output = formatter(results);
        expect(output).to.matchSnapshot();
      // var write = require('write').sync;
      // write(path.join(path.dirname(file), path.basename(file, '.json') + '.txt'), output);
      // var resultText = read(path.join(path.dirname(file), path.basename(file, '.json') + '.txt'));
      // expect(output).to.equal(resultText);
      });
    });
  });

});
