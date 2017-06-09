import 'babel-core/register';
import 'babel-polyfill';
import nightmare from 'nightmare';
import oc from 'oc';
import path from 'path';
import url from 'url';

// ui
const PORT = 3030;

const BASE_URL = url.format({
  protocol: process.env.PROTOCOL || 'http',
  hostname: process.env.HOST || 'localhost',
  port: process.env.PORT || PORT
});

const SUPERMAN = 'Superman';

test(`Hello ${SUPERMAN}`, async () => {
  const registry = new oc.Registry({
    baseUrl: `${BASE_URL}/`,
    local: true,
    port: PORT,
    hotReloading: false,
    path: path.resolve('./components'),
    env: { name: 'local' },
    verbosity: 0,
    discovery: true
  });

  registry.start();

  const page = nightmare({ show: true }).goto(`${BASE_URL}/hello-world/~preview?name=${SUPERMAN}`);
  const text = await page
    .wait(2000)
    .end()
    .evaluate(() => document.body.textContent);

  expect(text).toContain(`Hello ${SUPERMAN}`);
  expect(text).toMatchSnapshot();

  registry.close();
});
