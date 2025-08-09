import { useWordsContext } from "../../../contexts/WordsContext";
import HorizontalSeparator from "../../ui/HorizontalSeparator/HorizontalSeparator";
import ToggleOptionButton from "../../ui/ToggleOptionButton/ToggleOptionButton";
import WordlistsMenu from "../WordlistsMenu/WordlistsMenu";
import WordsCountCustomButton from "../WordsCountCustomButton/WordsCountCustomButton";
import WordsCountSelector from "../WordsCountSelector/WordsCountSelector";
import styles from "./OptionsMenu.module.css";

function OptionsMenu() {
	const context = useWordsContext();
	const { fullWordlistLength, activeOptions, setActiveOptions, resetWords } = context;

	return (
		<div className={`mb-1 ${styles.gridContainer}`} >
			<div className={styles.menu} id="wordlists_menu">
				<WordlistsMenu />
			</div> 
			<div className="d-flex flex-row gap-1">
				<ToggleOptionButton
					isActive={activeOptions.noRepeat}
					setIsActive={(value) => {
						setActiveOptions({ ...activeOptions, noRepeat: value });
						resetWords({resetOptions: { ...activeOptions, noRepeat: value }});
					}}
					borderDirection='left'>БЕЗ ПОВТОР.</ToggleOptionButton>
				<WordsCountSelector count={fullWordlistLength} title={'ВЕСЬ СПИСОК'} fontSize='smaller' borderDirection='left' />
				<HorizontalSeparator />
				<WordsCountSelector count={25} />
				<WordsCountSelector count={50} />
				<WordsCountSelector count={100} />
				<WordsCountCustomButton />
			</div>
		</div>
	);
}

export default OptionsMenu;