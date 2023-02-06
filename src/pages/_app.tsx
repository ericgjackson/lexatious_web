import { AppProps } from 'next/app';
import Head from 'next/head';
import { FunctionComponent } from 'react';
import { Provider } from 'react-redux';

import { createAppStore } from 'state';

import 'styles/global.scss';

const DESCRIPTION =
  // eslint-disable-next-line max-len
  'Lexatious - A novel word game similar to Scrabble.';
const KEYWORDS = [
  'Scrabble',
  'Words With Friends',
  'Word',
  'Word Game',
  'Eric Jackson',
].join(',');

const store = createAppStore();

const App: FunctionComponent<AppProps> = ({ Component, pageProps }) => (
  <>
    <Head>
      <title>Lexatious by Eric Jackson</title>
      <meta charSet="utf-8" />
      <meta name="author" content="Eric Jackson" />
      <meta name="description" content={DESCRIPTION} />
      <meta name="keywords" content={KEYWORDS} />
      <meta name="robots" content="index, follow, notranslate, noimageindex" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta property="og:title" content={DESCRIPTION} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://lexatious.com" />
      <meta property="og:image" content="https://lexatious.com/og.png" />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={DESCRIPTION} />
    </Head>

    <Provider store={store}>
      <p style={{ fontSize: 0 }}>
        Lexatious is a novel word game, similar to Scrabble or Words With Friends.
      </p>
      <Component {...pageProps} />
    </Provider>
  </>
);

export default App;
