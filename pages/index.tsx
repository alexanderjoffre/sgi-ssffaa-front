import { useContext } from 'react';
import type { NextPage } from 'next';
import { Layout } from '../src/layouts/Public';
import { AppContext } from '../src/contexts/App.context';

const Home: NextPage = () => {
  const { language } = useContext(AppContext);
  return (
    <Layout {...language.text.pages.index.meta}>
    </Layout>
  );
}

export default Home;
