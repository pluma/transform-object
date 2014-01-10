/*global describe, it */
var expect = require('expect.js'),
  transform = require('../');

function upper(s) {return s.toUpperCase();}
function lower(s) {return s.toLowerCase();}

describe('transform(Array, Array)', function() {
  it('returns an array', function() {
    expect(transform([], [])).to.be.an('array');
  });
  it('applies each transformation to each matching item', function() {
    expect(transform(['Foo', 'Bar', 'Qux'], [upper, lower]))
    .to.eql(['FOO', 'bar', 'Qux']);
  });
});

describe('transform(Array, *)', function() {
  it('applies the transformation to each item', function() {
    expect(transform(['Foo', 'Bar', 'Qux'], upper))
    .to.eql(['FOO', 'BAR', 'QUX']);
  });
});

describe('transform(Object, Object)', function() {
  it('applies each transformation to each matching property', function() {
    expect(transform({a: 'Foo', b: 'Bar', c: 'Qux'}, {a: upper, b: lower}))
    .to.eql({a: 'FOO', b: 'bar', c: 'Qux'});
  });
});

describe('transform(*, Function)', function() {
  it('passes the object to the function', function() {
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
  it('returns the object', function() {
    var arg = {};
    expect(transform(arg, undefined)).to.equal(arg);
  });
});

describe('transform(*, *)', function() {
  it('returns the transformation', function() {
    expect(transform('foo', 'bar')).to.equal('bar');
  });
});