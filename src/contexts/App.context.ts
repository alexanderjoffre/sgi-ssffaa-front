import { createContext } from "react";
interface AppContextStructure {
	loadingOverlay: string | null;
	setLoadingOverlay: (loadingOverlay: string | null) => void;
}

export const AppContext = createContext<AppContextStructure>({
	loadingOverlay: null,
	setLoadingOverlay: (loadingOverlay: string | null) => {}
});