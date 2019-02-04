/* @flow */

const AWSXRay = require('aws-xray-sdk');
console.log('Patching http global');
AWSXRay.captureHTTPsGlobal(require('http'));
// AWSXRay.captureAWS(require('aws-sdk'));
// AWSXRay.middleware.enableDynamicNaming();
console.log('Is xray automatic mode ', AWSXRay.isAutomaticMode());

function trace(handler) {
	console.log('tracing micro');
	return async function traceAsync(req, res) {
		const namespace = AWSXRay.getNamespace();
		const segment = new AWSXRay.Segment('trace-example');
		return await namespace.runAndReturn(async () => {
			AWSXRay.setSegment(segment);
			const handlerResponse = await handler(req, res);
			segment.close();
			return handlerResponse;
		});
	};
}

function captureAsync(func, args) {
	console.log('captureAsync ', func.name);
	return new Promise((resolve, reject) => {
		AWSXRay.captureAsyncFunc(func.name, (subsegment) => {
			func.apply(this, args)
				.then((result) => {
					subsegment.close();
					resolve(result);
				})
				.catch((error) => {
					subsegment.close(error);
					reject(error);
				});
		});
	});
}

module.exports = { trace, captureAsync };
