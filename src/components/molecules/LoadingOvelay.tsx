import { useContext } from "react"
import { AppContext } from "../../contexts/App.context"
import { EIcon } from "../../typescript/enums/Icon.enum";
import { Icon } from "../atoms/Icon";

export const LoadingOvelay = () => {
	const appContext = useContext(AppContext);

	return (
		<div className="loading-overlay">
			<Icon icon={EIcon.LOADING} css="loading-overlay__icon w-20 text-snow" />
			<span className="loading-overlay__text">
				{ appContext.loadingOverlay }
			</span>
		</div>
	);
}