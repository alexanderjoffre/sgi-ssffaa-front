import '../src/scss/main.scss';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { AppContext } from '../src/contexts/App.context';
import { idioms } from '../src/i18n/idioms';
import { DateAdapter } from '../src/adapters/Date.adapter';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const { locale } = useRouter();
  const languagePack = idioms[`${locale}`];

  const dateAdapter = DateAdapter.getAdapter();
  dateAdapter.setLocale(languagePack.dateLocale);

  return (
    <AppContext.Provider value={{
      language: languagePack
    }}>
      <Component {...pageProps} />
    </AppContext.Provider>
  );
}

export default MyApp;
