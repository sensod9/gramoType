import { useEffect, useRef, useState } from "react";
import { useWordsContext } from "../../../contexts/WordsContext";
import styles from "./WordInput.module.css";

function WordInput() {
	const context = useWordsContext();
	const { wordlist, currentWordIndex, addPassedWord, resetWords, registerWordsInputRef, focusWordsInput } = context; 

	const inputRef = useRef<HTMLInputElement>(null);
	useEffect(() => {
		focusWordsInput();
		const handleClick = (e: MouseEvent) => {
			const isfocusableElement =
				e.target instanceof HTMLInputElement ||
        (e.target instanceof HTMLElement && 
         (e.target.closest('input') || 
				  e.target.closest('.focusable')));
			if (!isfocusableElement) {
				focusWordsInput();
			}
		};
		
		document.addEventListener('click', handleClick);

		return () => {
			document.removeEventListener('click', handleClick);
		};
	}, [focusWordsInput]);

	useEffect(() => {
		registerWordsInputRef(inputRef.current);
	}, [registerWordsInputRef]);

	const [inputValue, setInputValue] = useState('');
	
	function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
		const key = event.key
		if (key == 'Enter' || key == ' ') {
			event.preventDefault();
			if (inputValue) {
				if (currentWordIndex == wordlist.length - 1) {
					resetWords({resetActivePopUp: 'ending_screen', resetPreviousMistakes: true, lastPassedWord: inputValue});
				} else {
					addPassedWord(inputValue);
				}
				setInputValue('');
			}
		} else if (key == 'Escape' || key == 'Tab') {
			event.preventDefault();
			setInputValue('');
			focusWordsInput();
			resetWords();
		}
	}

	return (
		<div className={styles.wrapper}>
			<input className={styles.input}
						 value={inputValue}
						 onChange={(e) => setInputValue(e.target.value)}
						 onKeyDown={handleKeyDown}
						 maxLength={18}
						 autoComplete="off"
						 autoCorrect="off"
						 autoCapitalize="off"
						 spellCheck={false}
						 ref={inputRef}
			/>
		</div>
	);
}

export default WordInput;