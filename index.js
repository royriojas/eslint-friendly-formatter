/**
 * Based on Stylish reporter from Sindre Sorhus
 */
'use strict';

var chalk = require( 'chalk' ),
  table = require( 'text-table' ),
  extend = require( 'extend' );

var process = require( './process' );

//------------------------------------------------------------------------------
// Helpers
//------------------------------------------------------------------------------

/**
 * Given a word and a count, append an s if count is not one.
 * @param {string} word A word in its singular form.
 * @param {int} count A number controlling whether word should be pluralized.
 * @returns {string} The original word with an s on the end if count is not one.
 */
function pluralize( word, count ) {
  return (count === 1 ? word : word + 's');
}

var parseBoolEnvVar = function ( varName ) {
  var env = process.env || { };
  return env[ varName ] === 'true';
};

var subtleLog = function ( args ) {
  return parseBoolEnvVar( 'EFF_NO_GRAY' ) ? args : chalk.gray( args );
};

var getEnvVar = function ( varName ) {
  var env = process.env || { };
  return env[ varName ] || false;
};

var getFileLink = function ( path, line, column ) {
  var scheme = getEnvVar( 'EFF_EDITOR_SCHEME' );
  if ( scheme === false ) {
    return false;
  }
  return scheme.replace( '{file}', encodeURIComponent( path ) ).replace( '{line}', line ).replace( '{column}', column );
};

//------------------------------------------------------------------------------
// Public Interface
//------------------------------------------------------------------------------

module.exports = function ( results ) {

  var output = '\n',
    total = 0,
    errors = 0,
    warnings = 0,
    summaryColor = 'yellow';

  results = results || [ ];

  var entries = [ ];
  var path = require( 'path' );
  var absolutePathsToFile = parseBoolEnvVar( 'EFF_ABSOLUTE_PATHS' );

  results.forEach( function ( result ) {
    var messages = result.messages || [ ];
    entries = entries.concat( messages.map( function ( message ) {
      return extend( {
        filePath: absolutePathsToFile ? path.resolve( result.filePath ) : result.filePath
      }, message );
    } ) );
  } );

  entries.sort( function ( a, b ) {
    return a.severity > b.severity ? 1 : -1;
  } );


  output += table(
        entries.map( function ( message ) {
          var messageType;

          if ( message.fatal || message.severity === 2 ) {
            messageType = chalk.red( 'error' );
            summaryColor = 'red';
            errors++;
          } else {
            messageType = chalk.yellow( 'warning' );
            warnings++;
          }

          var line = message.line || 0;
          var column = message.column || 0;

          var arrow = '';
          var hasSource = message.source !== undefined && message.source.length < 1000;
          if ( hasSource ) {
            for (var i = 0; i < message.column; i++) {
              if ( message.source.charAt( i ) === '\t' ) {
                arrow += '\t';
              } else {
                arrow += ' ';
              }
            }
            arrow += '^';
          }

          var filePath = message.filePath;
          var link = getFileLink( filePath, line, column );
          var filename = subtleLog( filePath + ':' + line + ':' + column );

          return [
            '',
            messageType,
            chalk.white( message.ruleId || '' ),
            message.message.replace( /\.$/, '' ),
            '$MARKER$  ' + (link === false ? chalk.underline( filename ) : filename) +
              (link === false ? '' : '$MARKER$  ' + chalk.underline( subtleLog( link ) )) + '$MARKER$  ' +
              (hasSource ? subtleLog( message.source ) + '$MARKER$  ' + subtleLog( arrow ) : '') + '$MARKER$'
          ];
        } ), {
          align: [
            '',
            'l',
            'c',
            'l',
            'l'
          ],
          stringLength: function ( str ) {
            return chalk.stripColor( str ).length;
          }
        } ).replace( /\$MARKER\$/g, '\n' ) + '\n\n';

  total = entries.length;

  if ( total > 0 ) {
    output += chalk[ summaryColor ].bold( [
      '\u2716 ',
      total,
      pluralize( ' problem', total ),
      ' (',
      errors,
      pluralize( ' error', errors ),
      ', ',
      warnings,
      pluralize( ' warning', warnings ),
      ')\n'
    ].join( '' ) );
  }

  return total > 0 ? output : '';
};
