import DropdownButton from "../../ui/DropdownButton/DropdownButton";
import { wordlistsAssoc } from "../../../data/wordlists";
import { useWordsContext } from "../../../contexts/WordsContext";

interface Props
{
	assocTitle: string;
	newWordlistKeys: Set<string> | null;
	setNewWordlistKeys: (value: Set<string> | null) => void;
};

function WordlistDropdownButton({ assocTitle, newWordlistKeys, setNewWordlistKeys }: Props) {
	const context = useWordsContext();
	const { progress } = context;

	const isActive = newWordlistKeys ? newWordlistKeys.has(assocTitle) : false;
	const isHighlighted = progress.completedWordlists ? progress.completedWordlists.has(assocTitle) : false; 
	
	function toggleIsActive() {
		const newSet = new Set(newWordlistKeys || []);
		if (isActive) {
			newSet.delete(assocTitle);
			setNewWordlistKeys(newSet.size > 0 ? newSet : null);
		} else {
			newSet.add(assocTitle);
			setNewWordlistKeys(newSet);
		}
	}

	return (
		<DropdownButton isActive={isActive} toggleIsActive={toggleIsActive} isHighlighted={isHighlighted}>
			{wordlistsAssoc[assocTitle as keyof typeof wordlistsAssoc]}
		</DropdownButton>
	);
}

export default WordlistDropdownButton;