import Document, { Head, Main, NextScript } from 'next/document'
import { Provider as StyletronProvider } from 'styletron-react'
import { styletron } from '../styletron'

class MyDocument extends Document {
  static getInitialProps (props) {
    const page = props.renderPage(App => props => (
      <StyletronProvider value={styletron}>
        <App {...props} />
      </StyletronProvider>
    ))
    const stylesheets = styletron.getStylesheets() || []
    return { ...page, stylesheets }
  }

  render () {
    return (
      <html style={{height: "100%"}}>
        <Head>
          {this.props.stylesheets.map((sheet, i) => (
            <style>{`
              #__next {
                height: 100%;
              }
            `}</style>
          ))}
        </Head>
        <body style={{ height: '100%', margin: 0 }}>
          <Main/>
          <NextScript />
        </body>
      </html>
    )
  }
}

export default MyDocument