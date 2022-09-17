import { createContext } from "react";

interface AppContextStructure {
	accountToken: string | null,
	setAccountToken: (accountToken: string) => void
}

export const AppContext = createContext<AppContextStructure>({
	accountToken: null,
	setAccountToken: (accountToken: string) => {}
});