import { useWordsContext } from "../../../contexts/WordsContext";
import HardModeIndicator from "../../ui/HardModeIndicator/HardModeIndicator";
import CurrentWordsCounter from "../CurrentWordsCounter/CurrentWordsCounter";
import MainMistakesList from "../MainMistakesList/MainMistakesList";
import PreviousEndScreenButton from "../PreviousEndScreenButton/PreviousEndScreenButton";
import SecondarySlider from "../SecondarySlider/SecondarySlider";
import WordInput from "../WordInput/WordInput";
import styles from "./InputRow.module.css";

function InputRowWrapper() {
	const context = useWordsContext();
	const { activeOptions } = context;

	return (
		<div className={styles.container}>
			<div className='wide me-2'>
				<MainMistakesList side='left' height='medium' />
			</div>
			<div className='narrow medium'>
				&nbsp;
			</div>
			<div className="d-flex flex-column">
				<WordInput />
				<span style={{userSelect: 'none'}}>&nbsp;</span>
				<div className='d-flex flex-row mt-2' style={{transform: 'translateX(50%)'}}>
					<div className='d-flex flex-column w-100' style={{transform: 'translateX(-50%)'}}>
						<CurrentWordsCounter />
						<div className='d-flex w-100 justify-content-center mt-2'>
							<PreviousEndScreenButton />
						</div>
						{activeOptions.hardMode && <HardModeIndicator /> }
						<div className='narrow mt-2'>
							<MainMistakesList side='center' height='small' />
						</div>
					</div>
					<div className='medium mt-2 position-absolute' style={{marginLeft: 'clamp(162px, 17.2vw, 170px)'}}>
						<MainMistakesList side='center' height='medium' width='adaptive' />
					</div>
				</div>
			</div>
			<div className='position-absolute mt-3' style={{ userSelect: 'none' }}>
				&nbsp; {/* крыша уже потихоньку едет */}
				<SecondarySlider />
			</div>
		</div>
	);
}

export default InputRowWrapper;