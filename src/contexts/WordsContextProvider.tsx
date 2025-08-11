import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import getRandomPairs from '../modules/getRandomPairs';
import { WordsContext, type resetWordsProps } from './WordsContext';
import type { TMistakes } from '../types/TMistakes';
import type { TPassedWords } from '../types/TPassedWords';
import getCookie from '../modules/getCookie';
import setCookie from '../modules/setCookie';
import type { TProgress } from '../types/TProgress';

function WordsContextProvider({ children }: { children: ReactNode }) {
	const cookies = getStateFromCookies();
	function getStateFromCookies() {
		{/*
				'wordlistKeys: EGE9,EGE10;'
				'wordsCount: 99;'
				'mistakes: п.ражение:паражение:поражение;'
				'activeOptions: 25:true:true;'
				'progress: 999:0:EGE9,EGE10;'
			*/}

		const strWordlistKeys = getCookie('wordlistKeys');
		const wordlistKeys = new Set(strWordlistKeys ? strWordlistKeys.split(',') : ['EGE9']);

		const strWordsCount = getCookie('wordsCount');
		const wordsCount = strWordsCount ? parseInt(strWordsCount) : 25;

		const strMistakes = getCookie('mistakes');
		const mistakes = strMistakes ? strMistakes.split(',').map((mistake) => {
			const mistakeValues = mistake.split(':');
			return { question: mistakeValues[0], incorrect: mistakeValues[1], correct: mistakeValues[2] }
		}) : null;

		const strActiveOptions = getCookie('activeOptions');
		let activeOptions = {
			wordsCountKey: '25',
			noRepeat: true,
			hardMode: false
		};
		if (strActiveOptions) {
			const arrActiveOptions = strActiveOptions.split(':');
			activeOptions = { wordsCountKey: 'custom', noRepeat: arrActiveOptions[1] === 'true', hardMode: false };
		}

		let progress: TProgress = { correctWordsCount: 0, maxCompletedWordlistsAtOnce: 0, completedWordlists: null};
		const strProgress = getCookie('progress');
		if (strProgress) {
			const arrProgress = strProgress.split(':');
			if (arrProgress.length > 2) {
				progress = { correctWordsCount: parseInt(arrProgress[0]), maxCompletedWordlistsAtOnce: parseInt(arrProgress[1]), completedWordlists: new Set(arrProgress[2].split(',')) };
			} else {
				progress = { correctWordsCount: parseInt(arrProgress[0]), maxCompletedWordlistsAtOnce: parseInt(arrProgress[1]), completedWordlists: null };
			}
		}
		
		return {
			wordlistKeys: wordlistKeys,
			wordsCount: wordsCount,
			mistakes: mistakes,
			activeOptions: activeOptions,
			progress: progress
		}
	}
	const [wordlistKeys, setWordlistKeys] = useState(cookies.wordlistKeys);
	const [wordsCount, setWordsCount] = useState(cookies.wordsCount);
	const { wordlist: wordlistTemp, initLength: fullWordlistLengthTemp } = getRandomPairs(wordsCount, wordlistKeys);
	const [wordlist, setWordlist] = useState(wordlistTemp);
	const [fullWordlistLength, setFullWordlistLength] = useState(fullWordlistLengthTemp);
	const [activeOptions, setActiveOptions] = useState({
		wordsCountKey: cookies.wordsCount == fullWordlistLength ? 'full'
					: ([25, 50, 100].includes(cookies.wordsCount) ? cookies.wordsCount.toString()
						: 'custom'),
		noRepeat: cookies.activeOptions.noRepeat,
		hardMode: cookies.activeOptions.hardMode
	});
	const [mistakes, setMistakes] = useState<null | TMistakes>(cookies.mistakes);

	const [currentWordIndex, setCurrentWordIndex] = useState(0);
	const [currentMistakes, setCurrentMistakes] = useState<null | TMistakes>(null);
	const [previousWordlistKeys, setPreviousWordlistKeys] = useState<null | Set<string>>(null);
	const [previousWordsCount, setPreviousWordsCount] = useState<null | number>(null);
	const [previousMistakes, setPreviousMistakes] = useState<null | TMistakes>(null);
	const [passedWords, setPassedWords] = useState<null | TPassedWords>(null);
	const [activePopUp, setActivePopUp] = useState<null | string>(null);
	const [activeScreenEffect, setActiveScreenEffect] = useState<null | string>(null);
	const [progress, setProgress] = useState(cookies.progress);

	useEffect(() => {
		setCookie('wordlistKeys', [...wordlistKeys].join(','));
	}, [wordlistKeys]);
	
	useEffect(() => {
		setCookie('wordsCount', wordsCount.toString());
	}, [wordsCount]);
	
	useEffect(() => {
		if (mistakes) {
			setCookie('mistakes', mistakes.map((mistake) => `${mistake.question}:${mistake.incorrect}:${mistake.correct}`).join(','));
		}
	}, [mistakes]);
	
	useEffect(() => {
		setCookie('activeOptions', `${activeOptions.wordsCountKey}:${activeOptions.noRepeat}:${activeOptions.hardMode}`);
	}, [activeOptions]);
	
	useEffect(() => {
		setCookie('progress', `${[progress.correctWordsCount, ':', progress.maxCompletedWordlistsAtOnce, progress.completedWordlists ? (':' + [...progress.completedWordlists].join(',')) : ''].join('')}`);
	}, [progress]);
	
	const wordsInputRef = useRef<null | HTMLInputElement>(null);
	const registerWordsInputRef = useCallback((ref: HTMLInputElement | null) => {
		wordsInputRef.current = ref;
	}, [])

	const focusWordsInput = useCallback(() => {
		setActivePopUp(null);
		wordsInputRef.current?.focus();
	}, []);

	function checkWord(word: string) {
		if (word.replaceAll('ё', 'е') == wordlist[currentWordIndex][1].replaceAll('ё', 'е')) {
			setProgress({...progress, correctWordsCount: progress.correctWordsCount + 1})
			return true;
		} else {
			addCurrentMistake(word);
			if (mistakes && mistakes.length == 24) {
				addMistake(word, true);
			} else {
				addMistake(word, false);
			}
			return false;
		}
	}
	
	function addMistake(word: string, cutStart = false) {
		const mistake = { question: wordlist[currentWordIndex][0], correct: wordlist[currentWordIndex][1], incorrect: word };
		if (!mistakes) {
			setMistakes([mistake]);
		} else {
			setMistakes(cutStart ? [...mistakes, mistake].slice(1) : [...mistakes, mistake])
		}
	}
	
	function addCurrentMistake(word: string) {
		const mistake = { question: wordlist[currentWordIndex][0], correct: wordlist[currentWordIndex][1], incorrect: word };
		if (!currentMistakes) {
			setCurrentMistakes([mistake]);
		} else {
			setCurrentMistakes([...currentMistakes, mistake]);
		}
	}

	function addPassedWord(word: string) {
		setCurrentWordIndex((prev) => prev + 1);
		const isCorrect = checkWord(word);
		if (activeOptions.hardMode && !isCorrect) {
			resetWords();
			return;
		}

		if (!passedWords) {
			setPassedWords([
				{ word: word, question: wordlist[currentWordIndex][0], answer: wordlist[currentWordIndex][1], isCorrect: isCorrect }
			]);
		} else {
			setPassedWords([...passedWords,
			{ word: word, question: wordlist[currentWordIndex][0], answer: wordlist[currentWordIndex][1], isCorrect: isCorrect }
			]);
		}
	}


	function resetWords({ resetWordsCount = wordsCount, resetOptions = activeOptions, resetWordlistKeys = wordlistKeys, resetActivePopUp = null, resetPreviousMistakes = false, lastPassedWord = null }: resetWordsProps = {}) {
		setWordsCount(resetWordsCount);
		setWordlistKeys(resetWordlistKeys);
		const { wordlist: newWordlist, initLength: newInitLength } = getRandomPairs(resetWordsCount, resetWordlistKeys, resetOptions.noRepeat);
		setFullWordlistLength(newInitLength);
		setActiveOptions({
			...resetOptions,
			wordsCountKey:
				resetWordsCount == newInitLength ? 'full'
					: ([25, 50, 100].includes(resetWordsCount) ? resetWordsCount.toString()
						: 'custom')
		})
		setWordlist(newWordlist);

		if (resetPreviousMistakes) {
			setPreviousWordsCount(resetWordsCount);
			setPreviousWordlistKeys(wordlistKeys);
			if (lastPassedWord) {
				const isCorrect = checkWord(lastPassedWord);
				if ((!isCorrect && !activeOptions.hardMode) || isCorrect) {
					setActivePopUp(resetActivePopUp);
					if (!isCorrect) {
						setPreviousMistakes([...(currentMistakes || []), {
							question: wordlist[currentWordIndex][0],
							correct: wordlist[currentWordIndex][1],
							incorrect: lastPassedWord
						}]);
					} else {
						setPreviousMistakes(currentMistakes);
						if (!currentMistakes && activeOptions.wordsCountKey == 'full') {
							const completedWordlists = progress.completedWordlists ? progress.completedWordlists : wordlistKeys;
							if (progress.completedWordlists) {
								wordlistKeys.forEach((key) => completedWordlists.add(key));
							}

							const maxCompletedWordlistsAtOnce = progress.maxCompletedWordlistsAtOnce < wordlistKeys.size ? wordlistKeys.size : progress.maxCompletedWordlistsAtOnce;
							setProgress({correctWordsCount: progress.correctWordsCount + 1, maxCompletedWordlistsAtOnce: maxCompletedWordlistsAtOnce, completedWordlists: completedWordlists});
						}
					}
				}
			} else {
				setPreviousMistakes(currentMistakes);
			}
		}

		setCurrentMistakes(null);
		setCurrentWordIndex(0);	
		setPassedWords(null);
	}

  return (
		<WordsContext.Provider value={
			{
				wordlistKeys, setWordlistKeys,
				wordlist, setWordlist,
				fullWordlistLength, setFullWordlistLength,
				currentWordIndex, setCurrentWordIndex,
				wordsCount, setWordsCount,
				mistakes, setMistakes, addMistake,
				currentMistakes, setCurrentMistakes, addCurrentMistake,
				previousWordlistKeys, setPreviousWordlistKeys,
				previousWordsCount, setPreviousWordsCount,
				previousMistakes, setPreviousMistakes,
				passedWords, setPassedWords, addPassedWord,
				activePopUp, setActivePopUp,
				activeScreenEffect, setActiveScreenEffect,
				activeOptions, setActiveOptions,
				progress, setProgress,
				registerWordsInputRef, focusWordsInput,
				checkWord, resetWords
			}}>
				{children}
		</WordsContext.Provider>
  )
}

export default WordsContextProvider;