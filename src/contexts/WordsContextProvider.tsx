import { useCallback, useRef, useState, type ReactNode } from 'react';
import getRandomPairs from '../modules/getRandomPairs';
import { WordsContext, type resetWordsProps } from './WordsContext';
import type { TMistakes } from '../types/TMistakes';
import type { TPassedWords } from '../types/TPassedWords';

function WordsContextProvider({ children }: { children: ReactNode }) {
	const [wordlistKeys, setWordlistKeys] = useState(['EGE9']);
	const [wordsCount, setWordsCount] = useState(25)
	const { wordlist: wordlistTemp, initLength: fullWordlistLengthTemp } = getRandomPairs(wordsCount, wordlistKeys);
	const [wordlist, setWordlist] = useState(wordlistTemp);
	const [fullWordlistLength, setFullWordlistLength] = useState(fullWordlistLengthTemp);
	const [currentWordIndex, setCurrentWordIndex] = useState(0);
	const [mistakes, setMistakes] = useState<null | TMistakes>(null);
	const [currentMistakes, setCurrentMistakes] = useState<null | TMistakes>(null);
	const [previousWordlistKeys, setPreviousWordlistKeys] = useState<null | string[]>(null);
	const [previousWordsCount, setPreviousWordsCount] = useState<null | number>(null);
	const [previousMistakes, setPreviousMistakes] = useState<null | TMistakes>(null);
	const [passedWords, setPassedWords] = useState<null | TPassedWords>(null);
	const [activePopUp, setActivePopUp] = useState<null | string>(null);
	const [activeScreenEffect, setActiveScreenEffect] = useState<null | string>(null);
	const [activeOptions, setActiveOptions] = useState({
		wordsCountKey: '25',
		noRepeat: true,
		hardMode: false
	});
	
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
		setActiveOptions({
			...resetOptions,
			wordsCountKey:
				resetWordsCount == fullWordlistLength ? 'full'
					: ([25, 50, 100].includes(resetWordsCount) ? resetWordsCount.toString()
						: 'custom')
		})
		setWordlistKeys(resetWordlistKeys);
		const { wordlist: newWordlist, initLength: newInitLength } = getRandomPairs(resetWordsCount, resetWordlistKeys, resetOptions.noRepeat);
		setFullWordlistLength(newInitLength);
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
				registerWordsInputRef, focusWordsInput,
				checkWord, resetWords
			}}>
				{children}
		</WordsContext.Provider>
  )
}

export default WordsContextProvider;