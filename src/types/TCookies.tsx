import type { TActiveOptions } from "./TActiveOptions";
import type { TMistakes } from "./TMistakes";
import type { TProgress } from "./TProgress";

export type TCookies = {
	wordlistKeys: string[];
	wordsCount: number;
	mistakes: TMistakes | null;
	activeOptions: TActiveOptions;
	progress: TProgress;
}