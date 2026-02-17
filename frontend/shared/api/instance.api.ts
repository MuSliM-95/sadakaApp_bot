import { FetchClient } from "../fetch/fetch-client";

console.log(process.env.NEXT_PUBLIC_SERVER_URL!);

export const api = new FetchClient({
	baseUrl: process.env.NEXT_PUBLIC_SERVER_URL!,
	options: {
		cache: 'no-store',
		// credentials: 'include'
	}
})
