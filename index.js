/**
 * Based on Stylish reporter from Sindre Sorhus
 */
'use strict';

var chalk = require( 'chalk' ),
  table = require( 'text-table' ),
  path = require( 'path' ),
  assign = require( 'lodash.assign' );

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

//------------------------------------------------------------------------------
// Public Interface
//------------------------------------------------------------------------------

module.exports = function ( results ) {

  var output = '\n',
    total = 0,
    errors = 0,
    warnings = 0,
    summaryColor = 'yellow';

  results = results || [];

  var entries = [];

  results.forEach( function ( result ) {
    var messages = result.messages || [];
    entries = entries.concat( messages.map( function ( message ) {
      return assign( {
        filePath: result.filePath
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

          var arrow = (new Array( column + 1 )).join( ' ' ) + '^';

          return [
            '',
            messageType,
            chalk.white( message.ruleId || '' ),
            message.message.replace( /\.$/, '' ),
            '$MARKER$  ' + chalk.underline( chalk.gray( message.filePath + ':' + line + ':' + column ) ) + '$MARKER$  ' + chalk.gray( message.source ) + '$MARKER$  ' + chalk.gray( arrow ) + '$MARKER$'
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
