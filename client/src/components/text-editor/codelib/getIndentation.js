import detectIndent from 'detect-indent';

const DEFAULT_INDENTATION = '    ';

/**
 * Detect indentation in a text
 * @param {String} text
 * @return {String}
 */
function getIndentation(text) {
  const result = detectIndent(text);
  return result.indent || DEFAULT_INDENTATION;
}

module.exports = getIndentation;
