import { useWordsContext } from "../../../contexts/WordsContext";
import OptionButton from "../../ui/OptionButton/OptionButton";

function PreviousEndScreenButton() {
	const context = useWordsContext();
	const { previousWordsCount, setActivePopUp } = context;

	return (
		<div className='focusable justify-content-start' style={{display: !previousWordsCount ? 'none' : 'flex', width: '100%'}}>
			<OptionButton isActive={false} onClick={() => setActivePopUp('ending_screen')} borderDirection='circle' fontSize='medium' style={{width: '87%'}}>
				<div className='d-flex justify-content-between align-items-center' style={{width: '100%'}}>
					<div>
						 Открыть прошлый экран окончания
					</div>
					<i className="fa-solid fa-bookmark"></i>
				</div>
			</OptionButton>
		</div>
	);
}

export default PreviousEndScreenButton;