const { App } = require("@slack/bolt");
const store = require("./store");
import { Messages } from "index.js";

const app = new App({
	signingSecret: process.env.SLACK_SIGNING_SECRET,
	token: process.env.SLACK_BOT_TOKEN
});

app.event("app_home_opened", ({ event, say }) => {
	// Look up the user from DB
	let user = store.getUser(event.user);

	if (!user) {
		user = {
			user: event.user,
			channel: event.channel
		};
		store.addUser(user);

		say(`Hello world, and welcome <@${event.user}>!`);
	} else {
		say("Hi again!");
	}
});

// The echo command simply echoes on command
app.command("/warhol", async ({ command, ack, say }) => {
	// Acknowledge command request
	ack();

	// echo back the command
	say(`${command.text}`);
});

app.post("/slack/slash-commands/open-menu", (req, res) => {
	res.status(200).end(); // best practice to respond with empty 200 status code
	let reqBody = req.body;
	let responseURL = reqBody.response_url;
	if (reqBody.token !== process.env.SLACK_BOT_TOKEN) {
		res.status(403).end("Access forbidden");
	} else {
		let message = {
			text: "This is your first interactive message",
			attachments: [
				{
					text: "Building buttons is easy right?",
					fallback: "Shame... buttons aren't supported in this land",
					callback_id: "button_tutorial",
					color: "#3AA3E3",
					attachment_type: "default",
					actions: [
						{
							name: "yes",
							text: "yes",
							type: "button",
							value: "yes"
						},
						{
							name: "no",
							text: "no",
							type: "button",
							value: "no"
						},
						{
							name: "maybe",
							text: "maybe",
							type: "button",
							value: "maybe",
							style: "danger"
						}
					]
				}
			]
		};
		sendMessageToSlackResponseURL(responseURL, message);
	}
	function sendMessageToSlackResponseURL(responseURL, JSONmessage) {
		let postOptions = {
			uri: responseURL,
			method: "POST",
			headers: {
				"Content-type": "application/json"
			},
			json: JSONmessage
		};
		request(postOptions, (error, response, body) => {
			if (error) {
				// handle errors as you see fit
			}
		});
	}
});

app.post("/slack/actions", urlencodedParser, (req, res) => {
	res.status(200).end(); // best practice to respond with 200 status
	let actionJSONPayload = JSON.parse(req.body.payload); // parse URL-encoded payload JSON string
	let message = {
		text:
			actionJSONPayload.user.name +
			" clicked: " +
			actionJSONPayload.actions[0].name,
		replace_original: false
	};
	sendMessageToSlackResponseURL(actionJSONPayload.response_url, message);
});

// Start your app
(async () => {
	await app.start(process.env.PORT || 3000);
	console.log("⚡️ Bolt app is running!");
})();
