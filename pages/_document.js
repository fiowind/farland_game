// _document is only rendered on the server side and not on the client side
// Event handlers like onClick can't be added to this file

// ./pages/_document.js
import Document, { Head, Main, NextScript } from "next/document"
import { ServerStyleSheet } from "styled-components"

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet()
    const page = ctx.renderPage(App => props => sheet.collectStyles(<App {...props} />))
    const styleTags = sheet.getStyleElement()
    return {
      ...page,
      styleTags,
    }
  }

  render() {
    const {
      styleTags, head
    } = this.props

    return (
      <html>
        <Head>
          <meta name="viewport" content="width=device-width,initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
          <link rel="shortcut icon" type="image/x-icon" href="/static/images/favicon.ico" />
          <meta httpEquiv="etag" />
          <meta name="google-site-verification" content="yAR4Kf7SbG9jbxFQa0ukYffAp4xuZO3Yieqx90nXNUg" />
          <style>{"body { margin: 0 } /* custom! */"}</style>
          {styleTags}
        </Head>
        <body className="custom_class">
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}