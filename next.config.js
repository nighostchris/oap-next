const withCSS = require('@zeit/next-css');

module.exports = {
    webpack: function (config) {
        config.externals = config.externals || {}
        config.externals['styletron-server'] = 'styletron-server'
        return config
    }
}