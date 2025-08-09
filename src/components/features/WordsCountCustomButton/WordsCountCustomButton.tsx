import { useWordsContext } from "../../../contexts/WordsContext";
import ButtonInput from "../../ui/ButtonInput/ButtonInput";

function WordsCountCustomButton() {
	const context = useWordsContext();
	const { activeOptions, resetWords, focusWordsInput } = context;

	function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>, inputValue: string) {
		const key = event.key;
		if (key == 'Enter' || key == ' ') {
			event.preventDefault();
			if (inputValue && inputValue != '0') {
				resetWords({ resetWordsCount: parseInt(inputValue) });
				focusWordsInput();
				return true;
			}
		} else if (key == 'Escape' || key == 'Tab') {
			event.preventDefault();
			focusWordsInput();
			return true;
		}
		return false;
	}
	
	function validateChange(e: React.ChangeEvent<HTMLInputElement>) {
		return /^\d*$/.test(e.target.value);
	}
	
	return (
		<ButtonInput
			isActive={activeOptions.wordsCountKey == 'custom' ? true : false}
			maxLength={4}
			validateChange={validateChange}
			handleKeyDown={handleKeyDown}
			handleBlur={() => focusWordsInput()}>
			<i className="fa-solid fa-pen-to-square"></i>
		</ButtonInput>
	);
}

export default WordsCountCustomButton;