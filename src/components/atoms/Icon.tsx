import ReactMdi from '@mdi/react';
import * as mdi from '@mdi/js';
import { EIcon } from '../../typescript/enums/Icon.enum';

export interface IIconProps {
	css?: string;
	icon: EIcon;
}

export const Icon = (props: IIconProps) => (
	<ReactMdi className={ props.css ?? 'w-6' }
		path={ icons.get(props.icon) }
	/>
);

const icons: Map<string, any> = new Map([
	[EIcon.ACCOUNT, mdi.mdiAccount],
	[EIcon.CHECK, mdi.mdiCheckCircleOutline],
	[EIcon.CLOSE, mdi.mdiClose],
	[EIcon.DELETE, mdi.mdiTrashCan],
	[EIcon.SEARCH, mdi.mdiMagnify],
]);