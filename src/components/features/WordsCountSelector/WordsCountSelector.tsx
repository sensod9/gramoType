import { useWordsContext } from "../../../contexts/WordsContext";
import OptionButton from "../../ui/OptionButton/OptionButton";

interface Props
{
	count: number;
	title?: string;
	fontSize?: string;
	borderDirection?: string;
};

function WordsCountSelector({ count, title = count.toString(), fontSize = 'normal', borderDirection = 'right' }: Props) {
	const context = useWordsContext();
	const { wordsCount, resetWords } = context;
	
	return (
		<OptionButton isActive={count == wordsCount ? true : false} fontSize={fontSize} onClick={() => {
			resetWords({ resetWordsCount: count });
		}} borderDirection={borderDirection}>
			{title}
		</OptionButton>
	);
}

export default WordsCountSelector;