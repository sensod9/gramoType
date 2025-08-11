import styles from "./TrophyStar.module.css";

interface Props
{
	phase?: number;
};

function TrophyStar({phase = 0}: Props) {
	return (
		<span className={`${styles.star} ${phase == 0 ? styles.phaseZero : phase == 1 ? styles.phaseOne : phase == 2 ? styles.phaseTwo : phase == 3 ? styles.phaseThree : phase == 4 ? styles.phaseFour : styles.phaseFive}`}>
			{ phase ? <i className="fa-solid fa-star"></i> :
			<i className="fa-regular fa-star"></i> }
		</span>
	);
}

export default TrophyStar;