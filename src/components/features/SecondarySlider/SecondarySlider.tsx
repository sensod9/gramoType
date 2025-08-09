import { useWordsContext } from "../../../contexts/WordsContext";
import PassedWord from "../../ui/PassedWord/PassedWord";
import WordSlider from "../../ui/WordSlider/WordSlider";
import styles from '../../ui/WordSlider/WordSlider.module.css';

function SecondarySlider() {
	const context = useWordsContext();
	const { passedWords } = context; 
	const loadLimit = 20;

	return (
		<div className={`${styles.absoluteGrid} low-order`} style={{pointerEvents: 'none'}}>
			<WordSlider className={`${styles.absoluteGrid} ${styles.background}`}>
				<span></span>
				<span className={styles.leftElement}>&nbsp;</span>
				<span className={styles.centerElement}>&nbsp;</span>
			</WordSlider>
			<WordSlider className={`${styles.absoluteGrid}`}>
				<span></span>
				<span>
					&nbsp;
					{passedWords && <PassedWord isCorrect={passedWords[passedWords.length - 1].isCorrect} isAccent={true}>{passedWords[passedWords.length - 1].answer}</PassedWord>}
				</span>
				<span>
					{passedWords && passedWords.length > 1 && 
						passedWords.slice(passedWords.length + 1 <= loadLimit ? 0 : passedWords.length - loadLimit + 1, passedWords.length - 1).reverse().map(
						(value, index) => (<PassedWord key={index} isCorrect={value.isCorrect} isAccent={false}>{value.answer}</PassedWord>)
					)}
					&nbsp;
				</span>
			</WordSlider>
		</div>
	);
}

export default SecondarySlider;