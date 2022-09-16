import '../src/scss/main.scss';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { AppContext } from '../src/contexts/App.context';
import { idioms } from '../src/i18n/idioms';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const { locale } = useRouter();
  const languagePack = idioms[`${locale}`];

  return (
    <AppContext.Provider value={{
      language: languagePack
    }}>
      <Component {...pageProps} />
    </AppContext.Provider>
  );
}

export default MyApp;
