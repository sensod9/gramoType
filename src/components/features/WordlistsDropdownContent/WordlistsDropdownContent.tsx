import { useEffect } from "react";
import { useWordsContext } from "../../../contexts/WordsContext";
import DropdownLabel from "../../ui/DropdownLabel/DropdownLabel";
import WordlistDropdownButton from "../WordlistDropdownButton/WordlistDropdownButton";

interface Props
{
	toggleIsActive: () => void;
	newWordlistKeys: string[] | null;
	setNewWordlistKeys: (value: string[] | null) => void;
};

function WordlistsDropdownContent({toggleIsActive, newWordlistKeys, setNewWordlistKeys}: Props) {
	const context = useWordsContext();
	const { focusWordsInput } = context;
	
	useEffect(() => {
		const handleClick = (e: MouseEvent) => {
			const isfocusableElement =
        (e.target instanceof HTMLElement && 
				  e.target.closest('#wordlists_menu'));
			if (!isfocusableElement) {
				toggleIsActive();
			}
		};
		
		document.addEventListener('click', handleClick);

		return () => {
			document.removeEventListener('click', handleClick);
		};
	}, [focusWordsInput, newWordlistKeys, toggleIsActive]);
	
	return (
		<>
			<DropdownLabel>
				Вставить букву вместо «.»<br />(или ничего не вставлять)
			</DropdownLabel>
			<WordlistDropdownButton assocTitle='EGE9' newWordlistKeys={newWordlistKeys} setNewWordlistKeys={setNewWordlistKeys} />
			<WordlistDropdownButton assocTitle='EGE10' newWordlistKeys={newWordlistKeys} setNewWordlistKeys={setNewWordlistKeys} />
			<WordlistDropdownButton assocTitle='EGE11' newWordlistKeys={newWordlistKeys} setNewWordlistKeys={setNewWordlistKeys} />
			<WordlistDropdownButton assocTitle='EGE12' newWordlistKeys={newWordlistKeys} setNewWordlistKeys={setNewWordlistKeys} />
			<DropdownLabel>
				Поставить ударение <br />(ударную гласную написать<br />с большой буквы)
			</DropdownLabel>
			<WordlistDropdownButton assocTitle='EGE4' newWordlistKeys={newWordlistKeys} setNewWordlistKeys={setNewWordlistKeys} />
		</>
	);
}

export default WordlistsDropdownContent;