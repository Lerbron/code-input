const proxySetting = {
	'/api/': {
		target: 'https://api.dev.thenextstone.com',
		changeOrigin: true,
	},
	"/file/": {
		target: 'https://api.dev.thenextstone.com',
		changeOrigin: true
	},
	"/connect/": {
		target: 'https://api.dev.thenextstone.com',
		changeOrigin: true
	},
	"/signalr": {
		target: 'https://api.dev.thenextstone.com',
		changeOrigin: true
	}
}

module.exports = proxySetting