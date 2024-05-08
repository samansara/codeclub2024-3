/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export default {
	async fetch(request, env, ctx) {
		// Use the CF BotM Properties to handle suspected bots
		const botScore = request.cf.botManagement.score;
		console.log(botScore)
		const botURL = new URL("http://httpbin.org/get");

		const botRequest = new Request(botURL, request);

		if (botScore < 30) {
			let response = await fetch(botRequest);
			return response
		};

		// Handle human GET requests and return content from origin

		if (request.method == "GET") {
			const origin = "k8.ansaralab.com"
			const originURL = "https://" + origin;
			const originRequest = new Request(originURL);
			let originResponse = await fetch(originRequest)
			return originResponse
		}

	},
};
