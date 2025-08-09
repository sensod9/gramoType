import type { ReactNode } from "react";
import styles from "./PassedWord.module.css";

interface Props
{
	isCorrect: boolean;
	isAccent: boolean;
	children: ReactNode;
};

function PassedWord({ isCorrect, isAccent, children }: Props) {
	return (
		<span className={`${isCorrect ? styles.correct : styles.incorrect} ${isAccent ? styles.accent : ''}`}>
			{children}
			&nbsp;
		</span>
	);
}

export default PassedWord;