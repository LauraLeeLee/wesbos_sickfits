import Document, { Html, Head, NextScript, Main } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  // Next.js boilerplate to be able to have access to do custom HTML attributes
  // as well as we need the ability to stick our CSS in the Head
  // getInitalProps is a hook
  static getInitialProps({ renderPage }) {
    const sheet = new ServerStyleSheet();
    const page = renderPage((App) => (props) =>
      sheet.collectStyles(<App {...props} />)
    );

    const styleTags = sheet.getStyleElement();
    // return a page along with the styleTags
    // its taking whatever the page had to initally get then adding
    // one more step, which is gathering all the CSS
    return { ...page, styleTags };
  }

  render() {
    return (
      <Html lang="en=CA">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
