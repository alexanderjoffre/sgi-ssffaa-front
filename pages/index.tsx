import { ChangeEvent, useContext, useState } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';

import { AppRoutes } from '../src/routes/App.routes';
import { Layout } from '../src/layouts/Public';
import { Card } from '../src/components/atoms/Card';
import { Image } from '../src/components/atoms/Image';
import { InputText } from '../src/components/molecules/InputText';
import { EIcon } from '../src/typescript/enums/Icon.enum';
import { Button } from '../src/components/molecules/Button';
import { UserProvider } from '../src/providers/User.provider';
import { HttpAdapter } from '../src/adapters/Http.adapter';
import { UserSchema } from '../src/schemas/User.schema';
import { LocalStorageHandler } from '../src/handlers/LocaStorage.handler';
import { AppContext } from '../src/contexts/App.context';

const httpClient = new HttpAdapter(process.env.NEXT_PUBLIC_BFF_URL);
const userProvider = new UserProvider(httpClient);
const localStorage = new LocalStorageHandler();

const Page: NextPage = () => {
  const router = useRouter();
  const { setAccountToken } = useContext(AppContext);
  
  const [userAccount, setUserAccount] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const login = async () => {
    try {
      const user: UserSchema = await userProvider.login(userAccount, password);
      localStorage.set('sgi-ssffaa-user-display-name', user.getDisplayName());
      setAccountToken( user.getToken() );

      router.push(AppRoutes.home);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Layout title='Inicio de Sesión'>
      <div className="container pt-50">
        <Card shadow rounded>
          <div className='px-4 py-3'>
            <h1 className='mb-10'>Sistema de Gestión Institucional</h1>
            <div className="grid md:cols-1 lg:cols-2 gap-20">
              <div>
                <h2 className='text-black mb-7'>Bienvenid@!</h2>
                <p className='text-md text-cool-gray'>
                  Para acceder a la plataforma debe ingresar su usuario y contraseña proporcionados por la institución.
                </p>
                <p className='text-md text-cool-gray mt-10'>
                  <strong>NOTA:</strong> Todos los datos ingresados en esta plataforma son confidenciales y de exclusiva responsabilidad de quienes tienen acceso a ellos. Cualquier divulgación no autorizada del contenido será penalizada bajo la normativa vigente sobre seguridad de la información.
                </p>
              </div>

              <div>
                <h2 className='mb-7'>Ingreso a la Plataforma</h2>
                <div className="mb-4">
                  <InputText type='text' value={userAccount} 
                    label="Usuario Institucional"
                    placeholder="jvasquez"
                    prefix={EIcon.ACCOUNT}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => setUserAccount(event.target.value)}
                  />
                </div>
                <div className="mb-8">
                  <InputText type='password' value={password} 
                    label="Contraseña"
                    placeholder="a$fE3.23$"
                    prefix={EIcon.LOCK}
                    onChange={(event: ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)}
                  />
                </div>
                <div className="flex-center-end">
                  <Button text="Ingresar" type="primary" onClick={login} />
                </div>
              </div>
            </div>

            <hr className="my-8" />

            <div className="flex-center-start gap-4">
              <div className="w-25">
                <Image src="/images/logo-ssffaa.png" />
              </div>
              <div className="text-cool-gray">
                <strong>
                  Departamento de Tecnologías de la Información y Comunicaciones
                </strong>
                <p className='mt-2'>
                  Alameda 1170 - Piso 3
                </p>
                <p>
                  soporte@defensa.cl
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </Layout>
  );
}

export default Page;
