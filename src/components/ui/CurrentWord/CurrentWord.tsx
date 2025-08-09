import type { ReactNode } from "react";
import styles from "./CurrentWord.module.css";

function CurrentWord({ children }: {children: ReactNode}) {
	return (
		<span className={styles.word}>
			{children}
			&nbsp;
		</span>
	);
}

export default CurrentWord;