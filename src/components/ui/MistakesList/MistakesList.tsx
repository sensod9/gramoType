import type { ReactNode } from "react";
import styles from "./MistakesList.module.css";
import VerticalSeparator from "../VerticalSeparator/VerticalSeparator";

interface Props
{
	title?: string;
	isActive?: boolean;
	side?: string;
	height?: string;
	width?: string;
	fontSize?: string;
	hardMode?: boolean;
	style?: React.CSSProperties;
	children: ReactNode;
};

function MistakesList({ title = '', isActive = true, side = 'center', height = 'medium', width = 'full', fontSize = 'medium', hardMode = false, style = {}, children }: Props) {
	return (
		<div className={`${styles.container} ${!isActive ? styles.hidden : ''} ${side == 'left' ? styles.left : styles.center}
										 ${hardMode ? styles.hardMode : ''}
										 ${width == 'adaptive' ? styles.adaptiveWidth : styles.fullWidth}
										 `} style={style}>
			<p className={`${styles.title} ${side == 'left' ? styles.left : styles.center}`}>{title}</p>
			<div className={`${styles.list}
				${height == 'small' ? styles.smallHeight : height == 'big' ? styles.bigHeight : styles.mediumHeight}
			  ${width == 'adaptive' ? styles.adaptiveWidth : styles.fullWidth}
				${fontSize == 'small' ? styles.smallFont : fontSize == 'big' ? styles.bigFont : styles.mediumFont}`}>
				<VerticalSeparator />
				{children}
			</div>
		</div>
	);
}

export default MistakesList;