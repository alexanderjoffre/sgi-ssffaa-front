import { useState } from "react";

export const useToggle = (init: boolean) => {
	const [value, setValue] = useState(init);
	const toggle = () => setValue(!value);

	return [value, toggle];
}