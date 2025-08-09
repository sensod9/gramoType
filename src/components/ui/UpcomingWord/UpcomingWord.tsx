import type { ReactNode } from "react";
import styles from "./UpcomingWord.module.css";

function UpcomingWord({ children }: {children: ReactNode}) {
	return (
		<span className={styles.word}>
			{children}
			&nbsp;
		</span>
	);
}

export default UpcomingWord;