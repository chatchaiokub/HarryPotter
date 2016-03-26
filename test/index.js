/* global describe, it*/
require('mocha-generators').install()

var Nightmare = require('nightmare')
var expect = require('chai').expect // jshint ignore:line

describe('test yahoo search results', function () {
  var nightmare = Nightmare()
  it('should buy sector 1 - 7 and expect Amount equal 7', function * () {
    this.timeout(15000)
    var value = yield nightmare
      .goto('http://localhost:5000')
      .click('#sec1')
      .click('#sec2')
      .click('#sec3')
      .click('#sec4')
      .click('#sec5')
      .click('#sec6')
      .click('#sec7')
      .click('.modal-trigger')
      .evaluate(function () {
        return document.querySelector('#TAM').innerHTML
      })
    expect(value).to.equal('7')
  })
  it('should buy sector 1 - 7 and expect Discount equal 420', function * () {
    this.timeout(15000)
    var value = yield nightmare
      .goto('http://localhost:5000')
      .click('#sec1')
      .click('#sec2')
      .click('#sec3')
      .click('#sec4')
      .click('#sec5')
      .click('#sec6')
      .click('#sec7')
      .click('.modal-trigger')
      .evaluate(function () {
        return document.querySelector('#discount').innerHTML
      })
    expect(value).to.equal('420')
  })
  it('should buy sector 1 - 7 and expect sumPrice when discount equal 280', function * () {
    this.timeout(15000)
    var value = yield nightmare
      .goto('http://localhost:5000')
      .click('#sec1')
      .click('#sec2')
      .click('#sec3')
      .click('#sec4')
      .click('#sec5')
      .click('#sec6')
      .click('#sec7')
      .click('.modal-trigger')
      .evaluate(function () {
        return document.querySelector('#sumPrice').innerHTML
      })
    expect(value).to.equal('280')
  })
  it('should buy sector 5 is 2 book AND buy sector 6 is 3 book AND buy sector 7 is 4 book expect sumPrice when discount equal 760', function * () {
    this.timeout(15000)
    var value = yield nightmare
      .goto('http://localhost:5000')
      .click('#sec5')
      .click('#sec5')
      .click('#sec6')
      .click('#sec6')
      .click('#sec6')
      .click('#sec7')
      .click('#sec7')
      .click('#sec7')
      .click('#sec7')
      .click('.modal-trigger')
      .evaluate(function () {
        return document.querySelector('#sumPrice').innerHTML
      })
    expect(value).to.equal('760')
  })
})
