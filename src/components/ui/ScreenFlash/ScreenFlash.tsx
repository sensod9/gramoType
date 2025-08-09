import styles from "./ScreenFlash.module.css";

interface Props
{
	onAnimationEnd?: () => void;
};

function ScreenFlash({onAnimationEnd = () => ''}: Props) {
	return (
		<div className={styles.screenEffect} onAnimationEnd={onAnimationEnd}>
		</div>
	);
}

export default ScreenFlash;