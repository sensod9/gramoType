import { useWordsContext } from "../../../contexts/WordsContext";
import TrophyStar from "../../ui/TrophyStar/TrophyStar";

interface Props
{
	orientation: string;
	justify?: string;
};

function TrophyBar({ orientation, justify }: Props) {
	const context = useWordsContext();
	const { progress } = context;
	const correctWordsPhase = progress.correctWordsCount >= 2000 ? 5 :
														progress.correctWordsCount >= 1000 ? 4 :
														progress.correctWordsCount >= 500 ?  3 :
														progress.correctWordsCount >= 250 ?  2 :
														progress.correctWordsCount >= 100 ?  1 : 0;
	const completedWordlistsPhase = progress.maxCompletedWordlistsAtOnce > 4 ? 5 :
																	progress.maxCompletedWordlistsAtOnce > 3 ? 4 :
																	progress.maxCompletedWordlistsAtOnce > 2 ?  3 :
																	progress.maxCompletedWordlistsAtOnce > 1 ?  2 :
																	progress.maxCompletedWordlistsAtOnce > 0 ?  1 : 0;

	return (
		<div className={`d-flex ${orientation == 'horizontal' ? (justify == 'start' ? 'flex-row gap-2 justify-content-start' : 'flex-row gap-2 justify-content-end') : 'flex-column'}`}>
			<TrophyStar phase={correctWordsPhase} title={progress.correctWordsCount.toString()}/>
			<TrophyStar phase={completedWordlistsPhase} title={progress.maxCompletedWordlistsAtOnce.toString()}/>
		</div>
	);
}

export default TrophyBar;