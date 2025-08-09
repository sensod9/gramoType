function formatTitle(keyList: string[], assocObject: object, maxTitleLength: number) {
	let sumLength = 0;
	let lastElementIndex = -1;
	for (const key of keyList) {
		if (sumLength + key.length + 5 >= maxTitleLength) {
			break;
		} else {
			lastElementIndex++;
			sumLength += key.length + 2;
		}
	} {/* кастомный эллипс. 24 из воздуха взял, подтвержаю*/ }

	const formattedTitle = keyList.length == Object.keys(assocObject).length ? 'ВСЕ СПИСКИ' : lastElementIndex == keyList.length - 1 ? keyList.join(', ')
		: keyList.slice(0, lastElementIndex + 1).join(', ').concat(', ...');
	return formattedTitle;
}

export default formatTitle;