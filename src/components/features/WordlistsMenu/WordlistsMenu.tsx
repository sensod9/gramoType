import { useState } from "react";
import { useWordsContext } from "../../../contexts/WordsContext";
import { wordlistsAssoc } from "../../../data/wordlists";
import DropdownMenu from "../../ui/DropdownMenu/DropdownMenu";
import WordlistsDropdownContent from "../WordlistsDropdownContent/WordlistsDropdownContent";
import formatTitle from "../../../modules/formatTitle";

function WordlistsMenu() {
	const context = useWordsContext();
	const { wordlistKeys, resetWords, focusWordsInput } = context;
	const assocWordlistKeys: string[] = wordlistKeys.map((key) =>
		wordlistsAssoc[key as keyof typeof wordlistsAssoc]
	);

	const [newWordlistKeys, setNewWordlistKeys] = useState<string[]|null>(wordlistKeys); 
	const [isActive, setIsActive] = useState(false);

	function toggleIsActive() {
		if (isActive) {
			if (newWordlistKeys && JSON.stringify(newWordlistKeys) != JSON.stringify(wordlistKeys)) {
				resetWords({ resetWordlistKeys: newWordlistKeys });
			} else {
				setNewWordlistKeys(wordlistKeys);
			}
			focusWordsInput();
		}
		
		setIsActive(!isActive)
	}

	const formattedTitle = formatTitle(assocWordlistKeys, wordlistsAssoc, 31); /* шрифт моноширинный. 30 не с потолка */
	return (
		<DropdownMenu title={formattedTitle} isActive={isActive} toggleIsActive={toggleIsActive}>
			<WordlistsDropdownContent toggleIsActive={toggleIsActive} newWordlistKeys={newWordlistKeys} setNewWordlistKeys={setNewWordlistKeys} />
		</DropdownMenu>
	);
}

export default WordlistsMenu;