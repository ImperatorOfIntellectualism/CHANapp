import { createClient, Provider } from 'urql';
import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { CookiesProvider } from 'react-cookie';

const client = createClient({
  url: 'http://127.0.0.1:3001/graphql',
});

function MyApp({ Component, pageProps }: AppProps) {
  return(
  <CookiesProvider>
  <Provider value={client}>
  <Component {...pageProps} />
  </Provider>
  </CookiesProvider>
  )
}
export default MyApp