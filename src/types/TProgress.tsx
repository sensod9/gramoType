export type TProgress = {
	correctWordsCount: number;
	maxCompletedWordlistsAtOnce: number;
	completedWordlists: null | Set<string>;
}