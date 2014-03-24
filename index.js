/*! transform-object 0.2.0 Original author Alan Plum <me@pluma.io>. Released into the Public Domain under the UNLICENSE. @preserve */
module.exports = transform;

function transform(obj, transformer) {
  if (typeof transformer === 'object' && typeof obj === 'object') {
    var result = Array.isArray(obj) ? [] : {};
    Object.keys(obj).forEach(function(key) {
      result[key] = transform(obj[key], transformer[key]);
    });
    return result;
  }
  if (typeof transformer === 'function') {
    return transformer(obj);
  }
  return transformer === undefined ? obj : transformer;
}
