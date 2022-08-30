import { createContext } from "react";
import { IIntlStrategy } from "../typescript/interfaces/IntlStrategy.interface";
import { IntlInfoSpanish } from '../i18n/es-ES.idiom';

interface AppContextStructure {
	language: IIntlStrategy
}

export const AppContext = createContext<AppContextStructure>({
	language: IntlInfoSpanish
});