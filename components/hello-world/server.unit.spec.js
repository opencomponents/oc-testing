import 'babel-core/register';
import 'babel-polyfill';

import { data } from './server';

// unit
const scenarios = [
  { name: null },
  { name: undefined },
  { name: '' },
  { name: 'Jane Doe' },
  { name: 'Zlatan Ibrahimović' }
];

scenarios.forEach((scenario) => {
  test(`when name is "${scenario.name}"`, () => {
    const context = { params: { name: scenario.name } };
    data(context, (error, model) => {
      expect(model).toMatchSnapshot();
    });
  });
});
