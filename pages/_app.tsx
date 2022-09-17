import '../src/scss/main.scss';
import type { AppProps } from 'next/app';
import { AppContext } from '../src/contexts/App.context';
import { useState } from 'react';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [accountToken, setAccountToken] = useState<string | null>(null)

  return (
    <AppContext.Provider value={{ accountToken, setAccountToken }}>
      <Component {...pageProps} />
    </AppContext.Provider>
  );
}

export default MyApp;
