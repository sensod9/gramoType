import type { ReactNode } from "react";
import styles from "./Footer.module.css"

interface Props
{
	leftElement?: ReactNode;
	rightElement?: ReactNode;
};

function Footer( {leftElement = <></>, rightElement = <></>}: Props ) {
	return (
		<footer className={`${styles.footer} focusable`}>
			<span className={`${styles.left} ${styles.inlineContainer}`}>
				{leftElement}
			</span>
			<span className={`${styles.right} ${styles.inlineContainer}`}>
				{rightElement}
			</span>
		</footer>
	);
}

export default Footer;