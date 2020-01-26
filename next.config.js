/* eslint-disable @typescript-eslint/no-var-requires */
const withCss = require('@zeit/next-css'); // import 'file.css'

module.exports = withCss({
    publicRuntimeConfig: {
        // Will be available on both server and client
        // Pass through env variables
        // apiBaseUrl: 'http://localhost:5000',
        // env: 'production',
        googleAnalyticsTraceId: process.env.GOOGLE_ANALYTICS_TRACE_ID || '',
    },

    webpack: config => {
        // Fixes npm packages that depend on `fs` module
        config.node = {
            fs: 'empty',
        };
        return config;
    },
});
