import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';
import { ServerStyleSheets } from '@material-ui/core/styles';
import { defaultTheme } from '../theme';
import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

export default class MyDocument extends Document {
    constructor(props) {
        super(props);

        this.gaTraceId = publicRuntimeConfig.googleAnalyticsTraceId;

        // console.log('ga: ', this.gaTraceId);

        this.addGoogleAnalyticsScript = this.addGoogleAnalyticsScript.bind(this);
    }

    private readonly gaTraceId: string;

    addGoogleAnalyticsScript() {
        return {
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', '${this.gaTraceId}');

            `,
        };
    }

    render() {
        return (
            <html lang="en">
                <Head>
                    <meta charSet="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
                    <link href="/favicon.ico" rel="shortcut icon" type="image/x-icon" />
                    <link rel="apple-touch-icon-precomposed" href="/bbon-icon.png" />
                    <link href="/bbon-icon-16.png" rel="icon" sizes="16x16" />
                    <link href="/bbon-icon-32.png" rel="icon" sizes="32x32" />
                    <link href="/bbon-icon-48.png" rel="icon" sizes="48x48" />
                    <link href="/bbon-icon-64.png" rel="icon" sizes="64x64" />
                    <link href="/bbon-icon-128.png" rel="icon" sizes="128x128" />
                    <link href="/bbon-icon.png" rel="icon" sizes="512x512" />

                    {/* PWA primary color */}
                    <meta name="theme-color" content={defaultTheme.palette.primary.main} />
                    <link
                        rel="stylesheet"
                        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
                    />
                    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
                    <link rel="stylesheet" href="/css/main.css" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                    {this.gaTraceId ? (
                        <>
                            <script
                                async
                                src={`https://www.googletagmanager.com/gtag/js?id=${this.gaTraceId}`}
                            ></script>
                            <script dangerouslySetInnerHTML={this.addGoogleAnalyticsScript()} />{' '}
                        </>
                    ) : (
                        undefined
                    )}
                </body>
            </html>
        );
    }
}

MyDocument.getInitialProps = async ctx => {
    // Resolution order
    //
    // On the server:
    // 1. app.getInitialProps
    // 2. page.getInitialProps
    // 3. document.getInitialProps
    // 4. app.render
    // 5. page.render
    // 6. document.render
    //
    // On the server with error:
    // 1. document.getInitialProps
    // 2. app.render
    // 3. page.render
    // 4. document.render
    //
    // On the client
    // 1. app.getInitialProps
    // 2. page.getInitialProps
    // 3. app.render
    // 4. page.render

    // Render app and page and get the context of the page with collected side effects.
    const sheets = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () =>
        originalRenderPage({
            enhanceApp: App => props => sheets.collect(<App {...props} />),
        });

    const initialProps = await Document.getInitialProps(ctx);

    return {
        ...initialProps,
        // Styles fragment is rendered after the app and page rendering finish.
        styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()],
    };
};
