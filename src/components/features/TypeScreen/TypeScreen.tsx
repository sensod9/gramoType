import { useWordsContext } from "../../../contexts/WordsContext";
import InputRow from "../InputRow/InputRow";
import MainSlider from "../MainSlider/MainSlider";
import OptionsMenu from "../OptionsMenu/OptionsMenu";

function TypeScreen() {
	const context = useWordsContext();
	const { activePopUp } = context;

	return (
		<div className={ activePopUp ? 'blurred' : ''}>
			<OptionsMenu />
			<div className="d-flex flex-column gap-1">
				<MainSlider />
				<InputRow />
			</div>
		</div>
	);
}

export default TypeScreen;