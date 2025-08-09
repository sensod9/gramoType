function getCookie(key: string): string | null {
	const regex = new RegExp(`(?:^| )${key}=([^;]*)`);
	const match = document.cookie.match(regex);
	return match ? decodeURIComponent(match[1]) : null;
}

export default getCookie;