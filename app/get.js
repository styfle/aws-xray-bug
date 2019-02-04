const sleep = require('./sleep');
const xray = require('./xray');

async function get(req, res) {
    res.setHeader('X-Some-Get', 'get');
    await sleep(700);

    return { message: "GET" };
}

module.exports = (...args) => xray.captureAsync(get, args);