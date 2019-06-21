const Nightmare = require('nightmare');
const oc = require('oc');
const path = require('path');

describe('ui testing a component', () => {
  let registry = null;
  let nightmare = null;

  beforeAll(done => {
    registry = new oc.Registry({
      baseUrl: 'http://localhost:3031/',
      local: true,
      port: 3031,
      hotReloading: false,
      path: path.resolve('./components'),
      env: { name: 'local' },
      verbosity: 0,
      discovery: true
    });

    nightmare = Nightmare({ show: true });
    registry.start(done);
  });

  afterAll(done => registry.close(done));

  describe('click-me component', () => {
    describe('when + button clicked twice and - clicked once', () => {
      let counter;
      beforeAll(done => {
        nightmare
          .goto('http://localhost:3031/click-me/~preview')
          .wait('oc-component #counter')
          .click('.plus')
          .click('.minus')
          .click('.plus')
          .end()
          .evaluate(() =>
            parseInt(document.querySelector('#counter').innerHTML, 10)
          )
          .then(result => {
            counter = result;
            done();
          });
      });

      it('should show 1', () => {
        expect(counter).toEqual(1);
      });
    });
  });
});
