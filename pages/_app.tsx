import '../src/scss/main.scss';

import type { AppProps } from 'next/app';
import { useContext, useState } from 'react';
import { AppContext } from '../src/contexts/App.context';
import { LoadingOvelay } from '../src/components/molecules/LoadingOvelay';
import { ShowBlock } from '../src/components/atoms/ShowBlock';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const appContext = useContext(AppContext);
  const [loadingOverlay, setLoadingOverlay] = useState<string | null>(null);

  return (
    <AppContext.Provider value={{ loadingOverlay, setLoadingOverlay }}>
      <ShowBlock if={!!appContext.loadingOverlay} Component={
        <LoadingOvelay />
      }/>
      <Component {...pageProps} />
    </AppContext.Provider>
  );
}

export default MyApp;
