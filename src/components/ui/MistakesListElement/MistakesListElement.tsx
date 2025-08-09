import VerticalSeparator from "../VerticalSeparator/VerticalSeparator";
import styles from "./MistakesListElement.module.css";

interface Props
{
	question: string;
	correct: string;
	incorrect: string;
};

function MistakesListElement({ question, correct, incorrect }: Props) {
	return (
		<>
			<div className={`focusable`}>
				<div className={`${styles.question} ${styles.element}`}>
					{question}
				</div>
				<div className={`${styles.correct} ${styles.element}`}>
					{correct}
				</div>
				<div className={`${styles.incorrect} ${styles.element}`}>
					{incorrect}
				</div>
			</div>
			<VerticalSeparator />
		</>
	);
}

export default MistakesListElement;