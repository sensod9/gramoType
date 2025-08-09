import { useWordsContext } from "../../../contexts/WordsContext";
import WordsCounter from "../../ui/WordsCounter/WordsCounter";

function EndScreenWordsCounter() {
	const context = useWordsContext();
	const { previousWordsCount, previousMistakes } = context;
	const mistakesCount = previousMistakes ? previousMistakes.length : 0;

	return (
		<WordsCounter typeName='ending' wordsCount={previousWordsCount ? previousWordsCount : 0} mistakesCount={mistakesCount} size='big' />
	);
}

export default EndScreenWordsCounter;