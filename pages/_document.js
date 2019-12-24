import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static getInitialProps(props) {
    const page = props.renderPage((App) => (pageProps) => (
      <App {...pageProps} />
    ));
    return page;
  }

  render() {
    return (
      <html lang="en" style={{ height: '100%' }}>
        <Head>
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css" integrity="sha256-+N4/V/SbAFiW1MPBCXnfnP9QSN3+Keu+NlB+0ev/YKQ=" crossOrigin="anonymous" />
          <link rel="stylesheet" href="/fonts/feather/feather.css" />
        </Head>
        <body style={{ margin: '0' }}>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}

export default MyDocument;
