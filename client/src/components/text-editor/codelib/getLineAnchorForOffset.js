import Immutable from 'immutable';
import getNewLine from './getNewLine';

const LineAnchor = Immutable.Record({
    // Index of the current line
  line: Number(0),

    // Offset in current line
  offset: Number(0),
});

LineAnchor.prototype.getLine = () => this.get('line');

LineAnchor.prototype.getOffset = () => this.get('offset');


/**
 * Return an anchor of a cursor in a block as a {line,offset} object
 *
 * @param {String} text
 * @param {Number} offset
 * @param {String} sep (optional)
 * @return {LineAnchor}
 */
function getLineAnchorForOffset(text, offset, sep) {
  const sep2 = sep || getNewLine(text);

  let lineIndex = 0;
  let nextLineIndex = 0;
  let lastLineIndex = 0;

  while (nextLineIndex >= 0 && nextLineIndex < offset) {
    lineIndex += 1;

    lastLineIndex = nextLineIndex;
    nextLineIndex = text.indexOf(sep2, nextLineIndex + sep2.length);
  }

  return new LineAnchor({
    line: (lineIndex - 1),
    offset: (offset - lastLineIndex),
  });
}

module.exports = getLineAnchorForOffset;
