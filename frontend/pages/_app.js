// _app.js is used in Next.js to override the global App component
// to get access to some features like persisting state or global layouts
// If the _app.js file exists, Next.js will use this instead of the default App
//
import { ApolloProvider } from '@apollo/client';
import NProgress from 'nprogress';
import Router from 'next/router';
import Page from '../components/Page';
// Swap with our own
// import 'nprogress/nprogress.css';
import '../components/styles/nprogress.css';
import withData from '../lib/withData';

Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

// Render out any children passed down.
// in Next.js is different -- its a prop of the app component that needs passed down
// the apollo client is at an application level
function MyApp({ Component, pageProps, apollo }) {
  // console.log(apollo);
  return (
    <ApolloProvider client={apollo}>
      <Page>
        <Component {...pageProps} />
      </Page>
    </ApolloProvider>
  );
}
// a Next.js thing
// if any of the pages have a getInitialProps on them, then we're going to wait
// and go and fetch the data.
MyApp.getInitialProps = async function ({ Component, ctx }) {
  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }
  // allows us to get any query variables
  pageProps.query = ctx.query;
  return { pageProps };
};

// wrapping MyApp in withDate() says give me MyApp but inject apollo client inside it
export default withData(MyApp);

// a provider in React is a component that usually lives very high in your
// application.  It allows components that are several levels deep in order to
// access that data.
// Apollo Client is at the application level, so ANYWHERE inside of the application
// (any level) I can go and fetch data from the Apollo Client
