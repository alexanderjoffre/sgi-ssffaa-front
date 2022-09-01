import Head from 'next/head';

interface ILayoutProps {

	// page keywords meta tag content
	kw?: string;

	// page description meta tag content
	desc?: string;

	// true if page must be indexed by search engines
	noIndex?: boolean;

	// page title
	title: string;

	// page content
	children: React.ReactNode;

}

export const Layout = (props: ILayoutProps) => {
	return (
		<>
			<Head>
				<meta name="keywords" content={props.kw} />
				<meta name="description" content={props.desc} />
				<meta name="robots" content={ props.noIndex ? 'noindex, nofollow' : 'index, follow' } />
				<title>{process.env.NEXT_PUBLIC_APP_NAME} | {props.title}</title>
			</Head>
			<main>
				{props.children}
			</main>
			<footer>
				<span>Sistema de Gestión Institucional v{process.env.NEXT_PUBLIC_APP_VERSION}</span>
			</footer>
		</>
	);
}