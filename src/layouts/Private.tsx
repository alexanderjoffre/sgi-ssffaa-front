import { useEffect, useState } from 'react';
import Head from 'next/head';
import { Icon } from '../components/atoms/Icon';
import { Image } from '../components/atoms/Image';
import { EIcon } from '../typescript/enums/Icon.enum';
import { Accordion } from '../components/molecules/Accordion';
import { Link } from '../components/atoms/Link';
import { RouteHandler } from '../handlers/Route.handler';
import { LocalStorageHandler } from '../handlers/LocalStorage.handler';
import { UserModel } from '../models/User.model';

interface ILayoutProps {
	// page title
	title: string;

	// page content
	children: React.ReactNode;
}

const MenuHeader = ({ title, icon }: {title: string, icon: EIcon}) => (
	<div className="flex-center-start gap-3">
		<Icon icon={icon} css="w-5" />
		<h4>{title}</h4>
	</div>
)

const MenuContent = ( props: { items: { route: string, text: string }[] }) => (
	<ul>
		{props.items.map(item => (
			<li key={item.text}>
				<Link route={new RouteHandler(item.route)}>
					<span>{ item.text }</span>
				</Link>
			</li>
		))}
	</ul>
)

const menus = [
	{
		uuid: 'nav-poll',
		title: <MenuHeader icon={EIcon.POLL} title="Votaciones" />,
		content: <MenuContent items={[
			{ route: '/', text: 'Crear Votación' },
			{ route: '/', text: 'Todas las Votaciones' },
			{ route: '/', text: 'Gestionar Plantillas' },
		]}/>
	},
	{
		uuid: 'nav-survey',
		title: <MenuHeader icon={EIcon.CHART_LINE} title="Encuestas" />,
		content: <MenuContent items={[
			{ route: '/', text: 'Crear Encuesta' },
			{ route: '/', text: 'Todas las Encuestas' },
			{ route: '/', text: 'Gestionar Plantillas' },
		]}/>
	},
	{
		uuid: 'nav-inscription',
		title: <MenuHeader icon={EIcon.HAND} title="Inscripciones" />,
		content: <MenuContent items={[
			{ route: '/', text: 'Crear Inscripción' },
			{ route: '/', text: 'Todas las Inscripciones' },
			{ route: '/', text: 'Gestionar Plantillas' },
		]}/>
	},
	{
		uuid: 'nav-quiz',
		title: <MenuHeader icon={EIcon.QUIZ} title="Evaluaciones" />,
		content: <MenuContent items={[
			{ route: '/', text: 'Crear Nuevo' },
			{ route: '/', text: 'Todas las Evaluaciones' },
			{ route: '/', text: 'Gestionar Plantillas' },
		]}/>
	},
	{
		uuid: 'nav-hr',
		title:<MenuHeader icon={EIcon.PEOPLE} title="Recursos Humanos" />,
		content: <MenuContent items={[
			{ route: '/', text: 'Estructura Organizacional' },
			{ route: '/', text: 'Búsqueda de Empleados' },
			{ route: '/', text: 'Reporte de Empleados' },
		]}/>
	},
	{
		uuid: 'nav-system',
		title: <MenuHeader icon={EIcon.CONFIG} title="Sistema" />,
		content: <MenuContent items={[
			{ route: '/', text: 'Gestionar Usuarios' },
			{ route: '/', text: 'Monitor de Actividad' },
			{ route: '/', text: 'Logs de Auditoría' },
		]}/>
	},
]

export const Layout = (props: ILayoutProps) => {

	const [account, setAccount] = useState<UserModel | null>(null);
	
	useEffect(() => {
		const localStorage = LocalStorageHandler.getAdapter();
		setAccount(localStorage.getUser());
	}, []);

	return (
		<>
			<Head>
				<title>{process.env.NEXT_PUBLIC_APP_NAME} :: {props.title}</title>
			</Head>
			<main>
				<nav className='private__navbar'>
					<div className='private__navbar--heading'>
						<div className='w-20'>
							<Image src="/images/logo-ssffaa.png" />
						</div>
						<div>
							<h2 className='mb-1'>SGI SSFFAA</h2>
							<span className='text-sm'>v{process.env.NEXT_PUBLIC_APP_VERSION}</span>
						</div>
					</div>

					<hr className="my-5" />
					<h4 className='private__navbar-account'>
						Hola, { account?.getDisplayName() }
					</h4>
					<hr className="my-5" />
					<Accordion items={menus} />
				</nav>
				<section>
					{props.children}
				</section>
			</main>
		</>
	);
}