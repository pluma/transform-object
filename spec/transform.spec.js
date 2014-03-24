/*global describe, it */
var expect = require('expect.js'),
  transform = require('../');

function upper(s) {return s.toUpperCase();}
function lower(s) {return s.toLowerCase();}
function map(fn) {return function(arr) {return arr.map(fn);};}

describe('transform(Array, Array)', function() {
  it('returns an array', function() {
    expect(transform([], [])).to.be.an('array');
  });
  it('applies each transformation to each matching item', function() {
    expect(transform(['Foo', 'Bar', 'Qux'], [upper, undefined, lower]))
    .to.eql(['FOO', 'Bar', 'qux']);
  });
});

describe('transform(Array, Object)', function() {
  it('returns an array', function() {
    expect(transform([], {})).to.be.an('array');
  });
  it('applies each transformation to each matching item', function() {
    expect(transform(['Foo', 'Bar', 'Qux'], {0: upper, 2: lower}))
    .to.eql(['FOO', 'Bar', 'qux']);
  });
});

describe('transform(Object, Object)', function() {
  it('applies each transformation to each matching property', function() {
    expect(transform({a: 'Foo', b: 'Bar', c: 'Qux'}, {a: upper, b: lower}))
    .to.eql({a: 'FOO', b: 'bar', c: 'Qux'});
  });
});

describe('transform(Array, Function)', function() {
  it('passes the array to the function', function() {
    var called = false,
      arg = [];
    transform(arg, function(fnArg) {
      expect(fnArg).to.equal(arg);
      called = true;
    });
    expect(called).to.equal(true);
  });
  it('returns the result of the function', function() {
    expect(transform(['foo', 'bar', 'qux'], map(upper))).to.eql(['FOO', 'BAR', 'QUX']);
  });
});

describe('transform(*, Function)', function() {
  it('passes the value to the function', function() {
    var called = false,
      arg = {};
    transform(arg, function(fnArg) {
      expect(fnArg).to.equal(arg);
      called = true;
    });
    expect(called).to.equal(true);
  });
  it('returns the result of the function', function() {
    expect(transform('a', upper)).to.equal('A');
  });
});

describe('transform(*, undefined)', function() {
  it('returns the value', function() {
    var arg = {};
    expect(transform(arg, undefined)).to.equal(arg);
  });
});

describe('transform(*, *)', function() {
  it('returns the transformation', function() {
    expect(transform('foo', 'bar')).to.equal('bar');
  });
});