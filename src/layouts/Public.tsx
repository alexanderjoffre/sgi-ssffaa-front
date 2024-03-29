import Head from 'next/head';

interface ILayoutProps {

	// page title
	title: string;

	// page content
	children: React.ReactNode;

}

export const Layout = (props: ILayoutProps) => {
	return (
		<>
			<Head>
				<title>{process.env.NEXT_PUBLIC_APP_NAME} :: {props.title}</title>
			</Head>
			<main>
				{props.children}
			</main>
			<footer className='flex-center-center py-5 text-cool-gray'>
				<span>v{process.env.NEXT_PUBLIC_APP_VERSION}</span>
			</footer>
		</>
	);
}