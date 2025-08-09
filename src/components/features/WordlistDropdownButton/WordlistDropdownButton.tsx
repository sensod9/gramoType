import DropdownButton from "../../ui/DropdownButton/DropdownButton";
import { wordlistsAssoc } from "../../../data/wordlists";
import { useState } from "react";

interface Props
{
	assocTitle: string;
	newWordlistKeys: string[] | null;
	setNewWordlistKeys: (value: string[]|null) => void;
};

function WordlistDropdownButton({ assocTitle, newWordlistKeys, setNewWordlistKeys }: Props) {
	const [isActive, setIsActive] = useState(newWordlistKeys ? newWordlistKeys.includes(assocTitle) : false);
	
	function toggleIsActive() {
		console.log(isActive, assocTitle);
		console.log(newWordlistKeys);
		if (isActive) {
			if (newWordlistKeys && newWordlistKeys.length == 1) {
				setNewWordlistKeys(null);
			} else if (newWordlistKeys) {
				setNewWordlistKeys(newWordlistKeys.filter(key => key != assocTitle)); {/* урок №1: не используй splice, если не умеешь читать */}
			}
		} else {
			setNewWordlistKeys(newWordlistKeys ? [...newWordlistKeys, assocTitle] : [assocTitle]);
		}
		setIsActive(!isActive);
	}

	return (
		<DropdownButton isActive={isActive} toggleIsActive={toggleIsActive}>
			{wordlistsAssoc[assocTitle as keyof typeof wordlistsAssoc]}
		</DropdownButton>
	);
}

export default WordlistDropdownButton;