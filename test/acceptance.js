'use strict'

const expect = require('chai').expect
const oc = require('oc')
const path = require('path')
const request = require('request')

describe('acceptance testing a component', () => {
  let registry

  before((done) => {
    registry = new oc.Registry({
      baseUrl: 'http://localhost:3030/',
      local: true,
      port: 3030,
      hotReloading: false,
      path: path.resolve('./components'),
      env: { name: 'local' },
      verbosity: 0
    })

    registry.start(done)
  })

  after(done => registry.close(done))

  describe('hello-world component', () => {
    describe('GET /hello-world', () => {
      it('should return expected response', (done) => {
        request({
          url: 'http://localhost:3030/hello-world',
          json: true
        }, (err, response, body) => {
          expect(err).to.equal(null)
          expect(body.html).to.equal('<div>Hello John Doe</div>')
          done()
        })
      })
    })

    describe('GET /hello-world/?name=Jane+Doe', () => {
      it('should return expected response', (done) => {
        request({
          url: 'http://localhost:3030/hello-world/?name=Jane+Doe',
          json: true
        }, (err, response, body) => {
          expect(err).to.equal(null)
          expect(body.html).to.equal('<div>Hello Jane Doe</div>')
          done()
        })
      })
    })
  })
})
