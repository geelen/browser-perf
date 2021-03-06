require('../lib/helpers.js').log(require('bunyan').createLogger({
	name: 'test',
	src: true,
	level: 'debug',
	streams: [{
		path: 'test.log'
	}]
}), true);


expect = require('chai').expect;
module.exports = {
	checkMetrics: function(res) {
		var expectedMetrics = {
			firefox: ['meanFrameTime', 'loadEventEnd'],
			chrome: ['mean_frame_time', 'jank', 'mostly_smooth', 'Layers', 'ExpensivePaints', 'ExpensiveEventHandlers', 'ParseHTML']
		};

		res.forEach(function(data) {
			if (!expectedMetrics[data._browserName]) {
				return;
			}
			expectedMetrics[data._browserName].forEach(function(metric) {
				expect(data).to.include.keys(metric);
			});
		});
	}
}