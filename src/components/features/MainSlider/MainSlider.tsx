import { useWordsContext } from "../../../contexts/WordsContext";
import CurrentWord from "../../ui/CurrentWord/CurrentWord";
import PassedWord from "../../ui/PassedWord/PassedWord";
import UpcomingWord from "../../ui/UpcomingWord/UpcomingWord";
import WordSlider from "../../ui/WordSlider/WordSlider";
import styles from '../../ui/WordSlider/WordSlider.module.css';

function MainSlider() {
	const context = useWordsContext();
	const { wordlist, currentWordIndex, wordsCount, passedWords } = context; 
	const loadLimit = 20;

	return (
		<div style={{position: 'relative', margin: '0 0 3px 0'}}>
			<WordSlider className={`${styles.background}`}>
				<span className={styles.centerElement}>&nbsp;</span>
			</WordSlider>
			<WordSlider className={styles.grid}>
				<span className={styles.passedWordsWrapper}>
					{passedWords && passedWords.slice(passedWords.length <= loadLimit ? 0 : passedWords.length - loadLimit).map(
						(value, index) => (<PassedWord key={index} isCorrect={value.isCorrect} isAccent={false}>{value.word}</PassedWord>)
					)}
					&nbsp; {/* <-- на этом держится ВСЁ */}
				</span>
				<span className={styles.currentWordWrapper}>
					<CurrentWord>&nbsp;&nbsp;
						{wordlist[currentWordIndex][0]}
						&nbsp;
					</CurrentWord>
				</span>
				<span className={styles.upcomingWordsWrapper}>
					{currentWordIndex != wordsCount - 1 && wordlist.slice(currentWordIndex + 1, currentWordIndex + loadLimit <= wordsCount ? currentWordIndex + loadLimit : wordsCount).map(
						(value, index) => (<UpcomingWord key={index}>{value[0]}</UpcomingWord>)
					)}
				</span>
			</WordSlider>
		</div>
	);
}

export default MainSlider;