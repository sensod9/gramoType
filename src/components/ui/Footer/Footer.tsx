import type { ReactNode } from "react";
import styles from "./Footer.module.css"

interface Props
{
	leftElement?: ReactNode;
	rightElement?: ReactNode;
	children?: ReactNode;
};

function Footer( {leftElement, rightElement, children}: Props ) {
	return (
		<footer className={`${styles.bottomPos} focusable`}>
			<div className='d-flex flex-column'>
				<span>
					{children}
				</span>
				<span className={`${styles.footer}`}>
					<span className={`${styles.left} ${styles.inlineContainer}`}>
						{leftElement}
					</span>
					<span className={`${styles.right} ${styles.inlineContainer}`}>
						{rightElement}
					</span>
				</span>
			</div>
		</footer>
	);
}

export default Footer;