import type { NextPage } from 'next';
import { Layout } from '../src/layouts/Public';

const Home: NextPage = () => {
  return (
    <Layout title='Inicio'>
      <h1>Hola</h1>
    </Layout>
  );
}

export default Home;
