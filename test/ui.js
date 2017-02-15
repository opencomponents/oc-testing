'use strict'

const expect = require('chai').expect
const Nightmare = require('nightmare')
const oc = require('oc')
const path = require('path')

describe('ui testing a component', () => {
  let registry, nightmare

  before((done) => {
    registry = new oc.Registry({
      baseUrl: 'http://localhost:3030/',
      local: true,
      port: 3030,
      hotReloading: false,
      path: path.resolve('./components'),
      env: { name: 'local' },
      verbosity: 0,
      discovery: true
    })

    nightmare = Nightmare({ show: true })
    registry.start(done)
  })

  after(done => registry.close(done))

  describe('click-me component', () => {
    describe('when + button clicked twice and - clicked once', () => {
      let counter
      before(done => {
        nightmare
          .goto('http://localhost:3030/click-me/~preview')
          .wait('oc-component #counter')
          .click('.plus')
          .click('.minus')
          .click('.plus')
          .evaluate(() => parseInt(document.querySelector('#counter').innerHTML, 10))
          .end()
          .then((result) => {
            counter = result
            done()
          })
      })

      it('should show 1', () => {
        expect(counter).to.equal(1)
      })
    })
  })
})
