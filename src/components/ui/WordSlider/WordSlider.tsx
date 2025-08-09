import type { ReactNode } from 'react';
import styles from './WordSlider.module.css';

interface Props
{
	className?: string,
	children: ReactNode
};

function WordSlider({ className = '', children }: Props) {
	return (
		<div className={`${styles.slider} ${className} gap-0`}>
			{children}
		</div>
	);
}

export default WordSlider;