import { createContext, useContext } from "react";
import type { TWordlist } from "../types/TWordlist";
import type { TMistakes } from "../types/TMistakes";
import type { TPassedWords } from "../types/TPassedWords";
import type { TActiveOptions } from "../types/TActiveOptions";
import type { TCookies } from "../types/TCookies";
import type { TProgress } from "../types/TProgress";

type TWordsContext = {
	wordlistKeys: string[];
	setWordlistKeys: (value: string[]) => void;
	wordlist: TWordlist;
	setWordlist: (value: TWordlist) => void;
	fullWordlistLength: number;
	setFullWordlistLength: (value: number) => void;
	currentWordIndex: number;
	setCurrentWordIndex: (value: number | ((prev: number) => number)) => void;
	wordsCount: number;
	setWordsCount: (value: number) => void;
	mistakes: TMistakes | null;
	setMistakes: (value: TMistakes | null) => void;
	addMistake: (value: string, cutStart: boolean) => void;
	currentMistakes: TMistakes | null;
	setCurrentMistakes: (value: TMistakes | null) => void;
	addCurrentMistake: (value: string) => void;
	previousWordlistKeys: null | string[];
	setPreviousWordlistKeys: (value: string[]) => void;
	previousWordsCount: null | number;
	setPreviousWordsCount: (value: number) => void;
	previousMistakes: TMistakes | null;
	setPreviousMistakes: (value: TMistakes | null) => void;
	passedWords: TPassedWords | null;
	setPassedWords: (value: TPassedWords | null) => void;
	addPassedWord: (value: string) => void;
	activePopUp: string | null;
	setActivePopUp: (value: string | null) => void;
	activeScreenEffect: string | null;
	setActiveScreenEffect: (value: string | null) => void;
	activeOptions: TActiveOptions;
	setActiveOptions: (value: TActiveOptions) => void;
	progress: TProgress;
	setProgress: (value: TProgress) => void;
	cookies: TCookies;
	setCookies: (value: TCookies) => void;
	registerWordsInputRef: (value: HTMLInputElement | null) => void;
	focusWordsInput: () => void;
	checkWord: (value: string) => boolean;
	resetWords: (props?: resetWordsProps) => void;
}

export interface resetWordsProps
{
	resetWordsCount?: number;
	resetOptions?: TActiveOptions;
	resetWordlistKeys?: string[];
	resetActivePopUp?: null | string;
	resetPreviousMistakes?: boolean;
	lastPassedWord?: null | string;
};

export const WordsContext = createContext<null|TWordsContext>(null);

export function useWordsContext() {
	const context = useContext(WordsContext);

	if (!context) throw new Error("Context error");
	return context;
}