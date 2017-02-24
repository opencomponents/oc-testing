import nightmare from 'nightmare';

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

// ui
const name = 'Superman';

test.skip(`Hello ${name}`, async () => {
  const page = nightmare().goto(`http://localhost:3030/hello-world/?name=${name}`);
  const text = await page.evaluate(() => document.body.textContent).end();
  expect(text).toContain(`Hello ${name}`);
  expect(text).toMatchSnapshot();
});
