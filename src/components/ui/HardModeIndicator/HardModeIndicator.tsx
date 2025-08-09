import styles from "./HardModeIndicator.module.css";

function HardModeIndicator() {
	return (
		<div className={styles.container}>
			<img src="/images/leftS9rinne.png" className={styles.image} title="I'M WATCHING YOUR EVERY STEP"/>
			<img src="/images/rightS9rinne.png" className={styles.image} title="I HEAR YOUR BREATH"/>
		</div>
	);
}

export default HardModeIndicator;