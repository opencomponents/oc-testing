const nightmare = require('nightmare');
const oc = require('oc');
const path = require('path');
const url = require('url');

// ui
const PORT = 3030;

const BASE_URL = url.format({
  protocol: process.env.PROTOCOL || 'http',
  hostname: process.env.HOST || 'localhost',
  port: process.env.PORT || PORT
});

const SUPERMAN = 'Superman';

test(`Hello ${SUPERMAN}`, done => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
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

  const page = nightmare({ show: true }).goto(
    `${BASE_URL}/hello-world/~preview?name=${SUPERMAN}`
  );
  page.wait(1000).end().evaluate(() => document.body.textContent).then(text => {
    expect(text).toContain(`Hello ${SUPERMAN}`);
    expect(text).toMatchSnapshot();

    registry.close();
    done();
  });
});
