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
	[EIcon.ARROW_LEFT, mdi.mdiChevronLeft],
	[EIcon.ARROW_RIGHT, mdi.mdiChevronRight],
	[EIcon.ATTACH, mdi.mdiPaperclip],
	[EIcon.CHECK, mdi.mdiCheckCircleOutline],
	[EIcon.CLOSE, mdi.mdiClose],
	[EIcon.DANGER, mdi.mdiCloseCircleOutline],
	[EIcon.DELETE, mdi.mdiTrashCan],
	[EIcon.EDIT, mdi.mdiPencil],
	[EIcon.EXCEL, mdi.mdiMicrosoftExcel],
	[EIcon.EYE, mdi.mdiEye],
	[EIcon.INFO, mdi.mdiInformationOutline],
	[EIcon.CONTEXT_MENU, mdi.mdiDotsVertical],
	[EIcon.SEARCH, mdi.mdiMagnify],
	[EIcon.SORT_ALPHABETHICAL, mdi.mdiUnfoldMoreHorizontal],
	[EIcon.SUCCESS, mdi.mdiCheckCircleOutline],
	[EIcon.WARNNING, mdi.mdiAlertOutline],
]);