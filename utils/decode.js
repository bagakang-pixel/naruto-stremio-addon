/**
 * SupJav encodes real video server URLs by reversing the data-link attribute.
 * The real URL is: https://lk1.supremejav.com/supjav.php?c=<REVERSED_STRING>
 *
 * Source: community reverse-engineering (hostbbs.net thread)
 */
function decodeSupJavLink(encoded) {
  if (!encoded || typeof encoded !== 'string') return null;

  // Reverse the string
  const reversed = encoded.split('').reverse().join('');

  // The reversed value may itself be a full URL or a path
  if (reversed.startsWith('http')) {
    return reversed;
  }

  // Build the supremejav proxy URL
  return `https://lk1.supremejav.com/supjav.php?c=${reversed}`;
}

/**
 * Some data-link values may be base64-encoded reversed strings.
 * Try multiple decode strategies.
 */
function decodeLinkRobust(encoded) {
  // Strategy 1: simple reversal
  const simple = decodeSupJavLink(encoded);
  if (simple) return simple;

  // Strategy 2: base64 decode then reverse
  try {
    const decoded = Buffer.from(encoded, 'base64').toString('utf-8');
    return decodeSupJavLink(decoded);
  } catch (_) {}

  // Strategy 3: URL-decode then reverse
  try {
    const decoded = decodeURIComponent(encoded);
    return decodeSupJavLink(decoded);
  } catch (_) {}

  return null;
}

module.exports = { decodeSupJavLink, decodeLinkRobust };
