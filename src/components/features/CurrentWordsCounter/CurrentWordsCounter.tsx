import { useWordsContext } from "../../../contexts/WordsContext";
import WordsCounter from "../../ui/WordsCounter/WordsCounter";

function CurrentWordsCounter() {
	const context = useWordsContext();
	const { wordsCount, currentWordIndex, currentMistakes, activeOptions } = context;
	const mistakesCount = currentMistakes ? currentMistakes.length : 0;

	return (
		<WordsCounter typeName={`${!activeOptions.hardMode ? 'current' : 'currentJustWords'}`} currentWordIndex={currentWordIndex} wordsCount={wordsCount} mistakesCount={mistakesCount} style={!activeOptions.hardMode ? {} : {borderRadius: '5px'}}/>
	);
}

export default CurrentWordsCounter;