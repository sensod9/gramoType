import { useEffect, useRef, useState, type ReactNode } from "react";
import styles from "./ButtonInput.module.css";

interface Props
{
	isActive?: boolean;
	maxLength?: number;
	validateChange?: (e: React.ChangeEvent<HTMLInputElement>) => boolean;
	handleKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>, inputValue: string) => boolean;
	handleBlur?: () => void;
	children?: ReactNode;
};

function ButtonInput({ isActive, maxLength, validateChange, handleKeyDown, handleBlur, children }: Props) {
	const [isInputActive, setIsInputActive] = useState(false);
	const [inputValue, setInputValue] = useState('');

	const inputRef = useRef<HTMLInputElement | null>(null);
	useEffect(() => {
		if (isInputActive && inputRef.current) {
			inputRef.current.focus();
		}
	}, [isInputActive]);

	function handleClick() {
		setIsInputActive(true);
	}

	return (
		<div className="focusable">
			<input ref={inputRef} type="text" maxLength={maxLength} value={inputValue}
				className={`${styles.button} ${isInputActive ? styles.active : styles.hidden} ${styles.input}`}
				onChange={(e) => {
					if (!validateChange || validateChange(e)) {
						setInputValue(e.target.value)
					}
				}}
				onKeyDown={(e) => {
					if (handleKeyDown && handleKeyDown(e, inputValue)) {
						setInputValue('');
					}
				}}
				onBlur={() => {
					setIsInputActive(false);
					setInputValue('');
					if (handleBlur) handleBlur();
				}}
			/>
			<button className={`${isInputActive ? styles.hidden : ''} ${styles.button} ${isActive ? styles.active : ''}`} onClick={handleClick}>
				{children}
			</button>
		</div>
	);
}

export default ButtonInput;