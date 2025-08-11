import { wordlists } from "../data/wordlists";
import type { TGetPairsResult } from "../types/TGetPairResult";
import type { TPair } from "../types/TPair";
import type { TWordlist } from "../types/TWordlist";

function getRandomPairs(count: number, wordlistKeys: Set<string>, noRepeat = true): TGetPairsResult {
	let wordlist: TWordlist = [];
	[...wordlistKeys].forEach((key) =>
		wordlist = wordlist.concat(wordlists[key].map(
		(pair) => [pair[0].replaceAll(' ', ' '), pair[1]] as TPair
	)));

	if (noRepeat) {
		const shuffledWordlist = shuffleArray(wordlist);
		let result = shuffledWordlist;

		for (let i = Math.ceil(count / shuffledWordlist.length); i > 1; i--) {
			result = result.concat(shuffledWordlist);
		}
		
		return { wordlist: result.slice(0, count), initLength: wordlist.length };
	} else {
		return { wordlist: Array.from({ length: count }, () => wordlist[Math.floor(Math.random() * wordlist.length)]), initLength: wordlist.length };
	}
}

function shuffleArray<T>(array: T[]) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}	
	
	return array;
}

export default getRandomPairs;