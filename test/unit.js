'use strict'

const expect = require('chai').expect

describe('unit testing a component', () => {
  describe('hello-world component', () => {
    const componentData = require('../components/hello-world/server').data

    describe('when providing name', () => {
      it('name should match passed variable', (done) => {
        componentData({
          params: { name: 'Jane Doe' }
        }, (err, viewModel) => {
          expect(err).to.be.null
          expect(viewModel.name).to.equal('Jane Doe')
          done()
        })
      })
    })

    describe('when not providing name', () => {
      it('name should match default', (done) => {
        componentData({ params: {} }, (err, viewModel) => {
          expect(err).to.be.null
          expect(viewModel.name).to.equal('John Doe')
          done()
        })
      })
    })
  })
})
