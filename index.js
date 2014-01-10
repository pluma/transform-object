/*! transform-object 0.1.1 Original author Alan Plum <me@pluma.io>. Released into the Public Domain under the UNLICENSE. @preserve */
module.exports = transform;

function transform(obj, transformer) {
  if (Array.isArray(obj)) {
    return Array.isArray(transformer) ? obj.map(function(value, i) {
      return transform(value, transformer[i]);
    }) : obj.map(function(value) {
      return transform(value, transformer);
    });
  }
  if (typeof transformer === 'object' && typeof obj === 'object') {
    var result = {};
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
