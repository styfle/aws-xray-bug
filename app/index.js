const micro = require('micro');
const xray = require('./xray');
const get = require('./get');
const post = require('./post');
const sleep = require('./sleep');

async function handler(req, res) {
    res.setHeader('X-Some-Example', 'example');

    await xray.captureAsync(sleep, [1000])

    if (req.method === 'GET') {
        const result = await get(req, res);
        return result;
    }

    if (req.method === 'POST') {
        const result = await post(req, res);
        return result;
    }

    return micro.send(res, 405, {
		error: {
			code: 'method_not_allowed',
			message: `The method ${req.method} is not allowed.`
		}
	});
}

const port = process.env.PORT || 8080;
const server = micro(xray.trace(handler));
server.listen(port, () => {
	console.log(`server started on port: ${port}`);
});
