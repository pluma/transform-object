**NOTE:** This package is no longer being maintained. If you are interested in taking over as maintainer or are interested in the npm package name, get in touch by creating an issue.

# Synopsis

**transform-object** transforms objects.

[![stability 3 - stable](http://b.repl.ca/v1/stability-3_--_stable-yellowgreen.png)](http://nodejs.org/api/documentation.html#documentation_stability_index) [![license - Unlicense](http://b.repl.ca/v1/license-Unlicense-lightgrey.png)](http://unlicense.org/) [![Flattr this](https://api.flattr.com/button/flattr-badge-large.png)](https://flattr.com/submit/auto?user_id=pluma&url=https://github.com/pluma/transform-object)

[![Build Status](https://travis-ci.org/pluma/transform-object.png?branch=master)](https://travis-ci.org/pluma/transform-object) [![Coverage Status](https://coveralls.io/repos/pluma/transform-object/badge.png?branch=master)](https://coveralls.io/r/pluma/transform-object?branch=master) [![Dependencies](https://david-dm.org/pluma/transform-object.png?theme=shields.io)](https://david-dm.org/pluma/transform-object)

[![NPM status](https://nodei.co/npm/transform-object.png?compact=true)](https://npmjs.org/package/transform-object)

# Install

## With NPM

```sh
npm install transform-object
```

## From source

```sh
git clone https://github.com/pluma/transform-object.git
cd transform-object
npm install
make test
```

# API

## transform(obj, transformation)

Transforms the given object by mapping it against the given transformation recursively.

If `obj` is an object and `transformation` is an object, returns a new object with each property set to the result of applying the property of the `transformation` to the respective property of the `obj`:

```javascript
function upper(s) {return s.toUpperCase();}
function lower(s) {return s.toLowerCase();}
var result = transform({a: 'Foo', b: 'Bar', c: 'Qux'}, {a: upper, b: lower});
console.log(result); // {a: 'FOO', b: 'bar', c: 'Qux'}
```

If `obj` is an array and `transformation` is an array or object, returns a new array with each item set to the result of applying the matching property or item of the `transformation` to the respective item in the `obj` array:

```javascript
function upper(s) {return s.toUpperCase();}
function lower(s) {return s.toLowerCase();}
var result1 = transform(['Foo', 'Bar', 'Qux'], {0: upper, 2: lower});
console.log(result1); // ['FOO', 'Bar', 'qux']
var result2 = transform(['Foo', 'Bar', 'Qux'], [upper, undefined, lower]);
console.log(result2); // ['FOO', 'Bar', 'qux']
```

If `transformation` is a `Function`, returns the result of calling it with the given `obj` as argument:

```javascript
function upper(s) {return s.toUpperCase();}
var result = transform('foo', upper);
console.log(result); // 'FOO'
```

If `transformation` is `undefined`, returns the `obj`:

```javascript
var result = transform('foo', undefined);
console.log(result); // 'foo'
```

Otherwise returns the `transformation`:

```javascript
var result = transform('foo', 'bar');
console.log(result); // 'bar'
```

# Unlicense

This is free and unencumbered public domain software. For more information, see http://unlicense.org/ or the accompanying [UNLICENSE](https://github.com/pluma/transform-object/blob/master/UNLICENSE) file.
