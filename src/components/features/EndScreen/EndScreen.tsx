import { useWordsContext } from "../../../contexts/WordsContext";
import { wordlistsAssoc } from "../../../data/wordlists";
import formatTitle from "../../../modules/formatTitle";
import PopUpWindow from "../../ui/PopUpWindow/PopUpWindow";
import EndScreenWordsCounter from "../EndScreenWordsCounter/EndScreenWordsCounter";
import MainMistakesList from "../MainMistakesList/MainMistakesList";

function EndScreen() {
	const context = useWordsContext();
	const { activePopUp, setActivePopUp, previousWordlistKeys, focusWordsInput } = context;
	const assocWordlistKeys: string[] = previousWordlistKeys ? previousWordlistKeys.map((key) =>
		wordlistsAssoc[key as keyof typeof wordlistsAssoc]
	) : [''];
	
	const formattedTitle = formatTitle(assocWordlistKeys, wordlistsAssoc, 39); /* шрифт моноширинный. 39 не с потолка */
	return (
		activePopUp === 'ending_screen' &&
		<PopUpWindow title={formattedTitle} handleClose={() => {
			setActivePopUp(null);
			focusWordsInput();
		}}>
				<EndScreenWordsCounter />
				<MainMistakesList typeName='previous' side='center' height='big' fontSize='big' style={{width: '93%', margin: 0}}/>
			</PopUpWindow>
	);
}

export default EndScreen;