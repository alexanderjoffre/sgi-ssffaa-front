# Front-end SGI Subsecretaría para las Fuerzas Armadas

Este proyecto fue realizados para consolidar las distintas aplicaciones de gestión que componen a la División Administrativa de la Subsecretaría para las Fuerzas Armadas del Ministerio de Defensa Nacional de Chile.

## Correr Aplicación
### Modo desarrollo
Para iniciar la aplicación, se debe ejecutar el siguiente comando, el cual levantara el sistema en el [siguiente link](http://localhost:3000)

```
npm run dev
```
## Documentación de Componentes
La documentación está realizada mediante Storybooks, la cual permite una óptima gestión de los diferentes estados y usos de los componentes que conforman la UI.
### Modo desarrollo
Para iniciar la documentación, se debe ejecutar el siguiente comando, el cual levantara el sistema en el [siguiente link](http://localhost:6006)

```
npm run storybook
```
## Composición del Proyecto
### Tecnologías Utilizadas
- **NextJS v12.2.5**: Framework basado en ReactJS para el manejo de front end reactivo.
- **SCSS v1.54.5**: Lenguaje de preprocesamiento de estilos para CSS.
### Metodologías Utilizadas
- **BEM**: Metodología para estructuración de CSS y definición de clases.
- **Patrones de Diseño**:
	- Adapter: Desacopla la lógica de la aplicación de las librerías de terceros.
	- Provider: Desacopla las lógicas de obtención de datos desde servicios externos (API) del resto de la aplicación.
	- Dependency Injection: Desacopla la responsabilidad de cada clase para facilitar el añadir nuevas funcionalidades al sistema.
	- RX: Se encarga de crear estructuras basadas en Observables para facilitar la programación reactiva.
	- Singleton: Se encarga de controlar que solo haya una única instancia de una clase específica que será utilizada a lo largo del ciclo de vida de la aplicación.