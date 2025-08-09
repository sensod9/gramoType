import styles from "./WordsCounter.module.css";

interface Props
{
	typeName: string;
	wordsCount: number;
	mistakesCount: number;
	size?: string;
	style?: React.CSSProperties;
	currentWordIndex?: number;
};

function WordsCounter({ typeName, wordsCount, mistakesCount, size = 'meduim', style = {}, currentWordIndex = 0 }: Props) {
	return (
		<>
			{ ((typeName == 'current' || typeName == 'currentJustWords' || typeName == 'currentJustWL') &&
			<div className={`d-flex flex-column gap-1`} style={style}>
					{(typeName == 'current' || typeName == 'currentJustWords') &&
						<div className={`${styles.container} ${styles.top} mt-2 ${size == 'big' ? styles.big : styles.medium}`} style={style}>
							<span className="text-end soft-accent">
								{currentWordIndex}
							</span>
							<span>
								|
							</span>
							<span className="text-start soft-accent">
								{wordsCount}
							</span>
						</div>
					}
					{(typeName == 'current' || typeName == 'currentJustWL') &&
						<div className={`${styles.container} ${styles.bottom} ${size == 'big' ? styles.big : styles.medium}`} style={style}>
							<span className="text-end correct-typed-accent">
								{currentWordIndex - mistakesCount}
							</span>
							<span>
								|
							</span>
							<span className="text-start incorrect-typed-accent">
								{mistakesCount}
							</span>
						</div>
					}
			</div>
			) || (typeName == 'ending' &&
			<div className="d-flex flex-row justify-content-between">
				<div className="d-flex flex-column gap-1" style={style}>
					<div className={`${styles.container} ${styles.top} ${size == 'big' ? styles.big : styles.medium}`} style={style}>
						<span className="text-end soft-accent">
							{wordsCount}
						</span>
						<span>
							|
						</span>
							<span className="text-start" style={{
							color: mistakesCount ? `rgb(${255*(1 - (wordsCount - mistakesCount) / (wordsCount))}, ${255*(wordsCount - mistakesCount) / (wordsCount)}, 0)` : `aqua`
						}}>
							{(((wordsCount - mistakesCount) / (wordsCount)) * 100).toFixed(1)}%
						</span>
					</div>
					<div className={`${styles.container} ${styles.bottom} ${size == 'big' ? styles.big : styles.medium}`} style={style}>
						<span className="text-end correct-typed-accent">
							{wordsCount - mistakesCount}
						</span>
						<span>
							|
						</span>
						<span className="text-start incorrect-typed-accent">
							{mistakesCount}
						</span>
					</div>
				</div>
				<div className={`${styles.indicator} ms-1`} style={{
						backgroundColor: mistakesCount ? `rgb(${255 * (1 - (wordsCount - mistakesCount) / (wordsCount))}, ${255 * (wordsCount - mistakesCount) / (wordsCount)}, 0)` : `aqua`,
						}}>
				</div>
			</div>
			)}
		</>
	);
}

export default WordsCounter;