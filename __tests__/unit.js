const componentData = require('../components/hello-world/server').data;

describe('unit testing a component', () => {
  describe('hello-world component', () => {
    describe('when providing name', () => {
      it('name should match passed variable', (done) => {
        componentData({
          params: { name: 'Jane Doe' }
        }, (err, viewModel) => {
          expect(err).toEqual(null);
          expect(viewModel.name).toEqual('Jane Doe');
          done();
        });
      });
    });

    describe('when not providing name', () => {
      it('name should match default', (done) => {
        componentData({ params: {} }, (err, viewModel) => {
          expect(err).toEqual(null);
          expect(viewModel.name).toEqual('John Doe');
          done();
        });
      });
    });
  });
});
