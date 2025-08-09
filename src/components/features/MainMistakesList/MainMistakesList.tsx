import MistakesListElement from "../../ui/MistakesListElement/MistakesListElement";
import MistakesList from "../../ui/MistakesList/MistakesList";
import { useWordsContext } from "../../../contexts/WordsContext";

interface Props
{
	isActive?: boolean;
	typeName?: string;
	side?: string;
	height?: string;
	width?: string;
	fontSize?: string;
	style?: React.CSSProperties;
};

function MainMistakesList({isActive = true, typeName = 'all', side = 'center', height = 'medium', width = 'full', fontSize = 'medium', style = {}}: Props) {
	const context = useWordsContext();
	const { mistakes, currentMistakes, previousMistakes, activeOptions } = context;

	let selectedMistakes = mistakes;
	switch (typeName) {
		case 'current':
			selectedMistakes = currentMistakes;
			break;
		case 'previous':
			selectedMistakes = previousMistakes;
			break;
	}

	return (
		<MistakesList isActive={isActive} title='Ошибки' side={side} height={height} width={width} hardMode={activeOptions.hardMode} fontSize={fontSize} style={style}>
			{selectedMistakes?.map((mistake, index) => <MistakesListElement question={mistake.question} correct={mistake.correct} incorrect={mistake.incorrect} key={index}/>).reverse()}
		</MistakesList>
	);
}

export default MainMistakesList;