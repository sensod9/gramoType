function setCookie(key: string, value: string | number, expires = false) {
	document.cookie = `${key}=${value};${expires ? 'expires=Fri, 31 Dec 9999 23:59:59 GMT' : ''}`;
}

export default setCookie;