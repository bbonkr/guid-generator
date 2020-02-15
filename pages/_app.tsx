import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import Router from 'next/router';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { defaultTheme } from '../theme';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

export default class MyApp extends App {
    constructor(props) {
        super(props);

        this.gaTraceId = publicRuntimeConfig.googleAnalyticsTraceId;

        this.handleRouteChangeComplete = this.handleRouteChangeComplete.bind(this);
    }

    private readonly gaTraceId: string;

    componentDidMount() {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }

        Router.events.on('routeChangeComplete', this.handleRouteChangeComplete);
    }

    componentWillUnmount() {
        Router.events.off('routeChangeComplete', this.handleRouteChangeComplete);
    }

    handleRouteChangeComplete(url: string): void {
        if (this.gaTraceId) {
            if (typeof window === 'object') {
                const { title } = window.document;
                const { href, pathname } = window.location;

                window.gtag('config', this.gaTraceId, {
                    page_title: title,
                    page_location: href,
                    page_path: pathname,
                });
            }
        }
    }

    render() {
        const { Component, pageProps } = this.props;

        return (
            <React.Fragment>
                <Head>
                    <title>My page</title>
                    <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
                </Head>
                <ThemeProvider theme={defaultTheme}>
                    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                    <CssBaseline />
                    <Component {...pageProps} />
                </ThemeProvider>
            </React.Fragment>
        );
    }
}
