import type { TWordlists } from "../types/TWordlists";

async function getWordlists(): Promise<TWordlists> {
	const url = "https://raw.githubusercontent.com/sensod9/gramoType/refs/heads/main/gramoType_v.offline/words/wordlists.json";

	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error('GitHub не ответил корректно. Возможно файл со словами был перенесён. Обновите страницу через какое-то время');
		}
		
		const result = await response.json();
		return result;
	} catch (error) {
		if (error instanceof Error) {
			console.error(error.message);
		} else {
			console.error('Произошла неизвестная ошибка')
		}
		return { wordlists: [] };
	}
}

export default getWordlists;