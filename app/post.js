const sleep = require('./sleep');
const xray = require('./xray');

async function post(req, res) {
    res.setHeader('X-Some-Post', 'post');
    await sleep(1000);
    return {  message: "POST" };
}

module.exports = (...args) => xray.captureAsync(post, args);