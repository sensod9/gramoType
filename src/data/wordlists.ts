import type { TWordlists } from './../types/TWordlists';
import getWordlists from "../modules/getWordlists";

export const wordlists: TWordlists = await getWordlists();
export const wordlistsAssoc = {
	'EGE9': 'ЕГЭ №9',
	'EGE10': 'ЕГЭ №10',
	'EGE11': 'ЕГЭ №11',
	'EGE12': 'ЕГЭ №12',
	'EGE4': 'ЕГЭ №4'
}