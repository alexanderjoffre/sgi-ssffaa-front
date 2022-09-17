import Head from 'next/head';
import { LocalStorageHandler } from '../handlers/LocaStorage.handler';

interface ILayoutProps {
	// page title
	title: string;

	// page content
	children: React.ReactNode;
}

const localStorage = new LocalStorageHandler();

export const Layout = (props: ILayoutProps) => {
	return (
		<>
			<Head>
				<title>{process.env.NEXT_PUBLIC_APP_NAME} :: {props.title}</title>
			</Head>
			<main>
				<nav>
					Hola, {localStorage.get('sgi-ssffaa-user-display-name')}
				</nav>
				<section>
					{props.children}
				</section>
			</main>
			<footer className='flex-center-center py-5 text-cool-gray'>
				<span>v{process.env.NEXT_PUBLIC_APP_VERSION}</span>
			</footer>
		</>
	);
}