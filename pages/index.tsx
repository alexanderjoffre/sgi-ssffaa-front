import type { NextPage } from 'next';
import { CHLPhoneMaskStrategy, COLPhoneMaskStrategy, PhoneMaskHelper } from '../src/helpers/phone.helper';
import { Layout } from '../src/layouts/Public';

const Home: NextPage = () => {
  const phone = new PhoneMaskHelper();

  return (
    <Layout title='Inicio'>
      <div>
        {phone.format('56964424065', new CHLPhoneMaskStrategy())}
      </div>
      <div>
        {phone.format('573242758042', new COLPhoneMaskStrategy())}
      </div>
    </Layout>
  );
}

export default Home;
