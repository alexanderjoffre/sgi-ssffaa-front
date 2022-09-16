import { ComponentMeta, ComponentStory } from "@storybook/react";

export class StoryBookItem {

	private readonly component: (props: any) => JSX.Element; 

	constructor( component: (props: any) => JSX.Element ) {		
		this.component = component;
	}

	public createMetadata(
		title: string, 
		componentDescription: string, 
		metadata: ComponentMeta<typeof this.component>
	) {
		type StoryMetaType = ComponentMeta<typeof this.component>;

		const componentMeta: StoryMetaType = {
			...metadata,
			title,
			component: this.component,
			parameters: {
				docs: {
					description: {
						component: componentDescription,
					},
				},
			}
		};

		return componentMeta;
	}
	
	public createTemplate<T>(props: T) {
		type ComponentStoryType = ComponentStory<typeof this.component>;

		const template: ComponentStoryType = (props) => <this.component {...props} />;
		template.args = props;

		return template;
	}

	public static makeSelectControl (data: object) {
		return {
			options: Object.keys(data),
			mapping: data,
			control: {
				type: 'select',
				labels: Object.values(data)
			},
		}
	};

}