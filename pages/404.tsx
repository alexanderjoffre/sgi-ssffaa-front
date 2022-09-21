import type { NextPage } from 'next';
import { Layout } from '../src/layouts/Public';

const Home: NextPage = () => {
  return (
    <Layout title="Página no encontrada">
      Oop! not found
    </Layout>
  );
}

export default Home;
