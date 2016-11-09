import Immutable from 'immutable';
import getNewLine from './getNewLine';

/**
 * Return a list of line in this text
 * @param {String} text
 * @param {String} sep (optional)
 * @return {List<String>}
 */
function getLines(text, sep) {
  const sep2 = sep || getNewLine(text);
  return Immutable.List(text.split(sep2));
}

module.exports = getLines;
