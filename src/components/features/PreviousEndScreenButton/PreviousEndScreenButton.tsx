import { useWordsContext } from "../../../contexts/WordsContext";
import OptionButton from "../../ui/OptionButton/OptionButton";

function PreviousEndScreenButton() {
	const context = useWordsContext();
	const { previousWordsCount, setActivePopUp } = context;

	return (
		<div className='focusable' style={{display: !previousWordsCount ? 'none' : 'block'}}>
			<OptionButton isActive={false} onClick={() => setActivePopUp('ending_screen')} width='full' height='double' borderDirection='circle' style={{ width: 'clamp(250px, 34vw, 330px)' }}>
				<i className="fa-solid fa-bookmark"></i>
				<div style={{fontSize: 'clamp(12px, 1.5vw, 17px)'}}>
					 Открыть прошлый <br /> экран окончания
				</div>
				<i className="fa-solid fa-bookmark"></i>
			</OptionButton>
		</div>
	);
}

export default PreviousEndScreenButton;