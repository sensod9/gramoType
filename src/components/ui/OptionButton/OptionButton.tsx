import type { ReactNode } from "react";
import styles from "./OptionButton.module.css";

interface Props
{
	isActive: boolean;
	onClick: () => void;
	fontSize?: string;
	width?: string;
	height?: string;
	borderDirection?: string;
	isHighlighted?: boolean;
	style?: React.CSSProperties;
	children: ReactNode;
};

function OptionButton({ isActive, onClick, fontSize = 'normal', width = 'small', height = 'normal', borderDirection = 'right', isHighlighted = false, style = {}, children }: Props) {
    return (
        <button 
            className={`${styles.button} 
                       ${isActive ? styles.active : ''}
                       ${borderDirection === 'right' ? styles.borderRight : 
                         borderDirection === 'left' ? styles.borderLeft : 
												 borderDirection === 'down' ? styles.borderDown :
												 borderDirection === 'up' ? styles.borderUp :
												 borderDirection === 'circle' ? styles.borderCircle : styles.borderSquare}
                       ${fontSize === 'smaller' ? styles.smaller : fontSize === 'small' ? styles.small : ''}
                       ${width === 'full' ? styles.fullWidth : ''}
											 ${height === 'double' ? styles.doubleHeight : ''}
											 ${isHighlighted ? styles.highlighted : ''}`} 
            onClick={onClick} style={style}>
            {children}
        </button>
    );
}

export default OptionButton;