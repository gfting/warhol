const { App } = require("@slack/bolt");

const app = new App({
	token: process.env.SLACK_BOT_TOKEN,
	signingSecret: process.env.SLACK_SIGNING_SECRET
});

// Listens to incoming messages that contain "hello"
app.message("hello", ({ message, say }) => {
	// say() sends a message to the channel where the event was triggered
	say({
		blocks: [
			{
				type: "section",
				text: {
					type: "mrkdwn",
					text: `Hey there <@${message.user}>!`
				},
				accessory: {
					type: "button",
					text: {
						type: "plain_text",
						text: "Click Me"
					},
					action_id: "button_click"
				}
			}
		]
	});
});

app.action("button_click", ({ body, ack, say }) => {
	// Acknowledge the action
	ack();
	say(`<@${body.user.id}> clicked the button`);
});

// Listens for the warhol slash command
app.command("warhol", ({ message, say }) => {
	ack();
	// say() sends a message to the channel where the event was triggered
	say({
		blocks: [
			{
				type: "section",
				text: {
					type: "mrkdwn",
					text:
						"Hello, Ruby! *What message would you like to send?*\n\n *Please select a restaurant:*"
				}
			},
			{
				type: "divider"
			},
			{
				type: "section",
				text: {
					type: "mrkdwn",
					text:
						"*Farmhouse Thai Cuisine*\n:star::star::star::star: 1528 reviews\n They do have some vegan options, like the roti and curry, plus they have a ton of salad stuff and noodles can be ordered without meat!! They have something for everyone here"
				}
			},
			{
				type: "section",
				text: {
					type: "mrkdwn",
					text:
						"*Kin Khao*\n:star::star::star::star: 1638 reviews\n The sticky rice also goes wonderfully with the caramelized pork belly, which is absolutely melt-in-your-mouth and so soft."
				}
			},
			{
				type: "section",
				text: {
					type: "mrkdwn",
					text:
						"*Ler Ros*\n:star::star::star::star: 2082 reviews\n I would really recommend the  Yum Koh Moo Yang - Spicy lime dressing and roasted quick marinated pork shoulder, basil leaves, chili & rice powder."
				}
			},
			{
				type: "divider"
			},
			{
				type: "actions",
				elements: [
					{
						type: "button",
						text: {
							type: "plain_text",
							text: "Farmhouse",
							emoji: true
						},
						value: "click_me_123"
					},
					{
						type: "button",
						text: {
							type: "plain_text",
							text: "Kin Khao",
							emoji: true
						},
						value: "click_me_123"
					},
					{
						type: "button",
						text: {
							type: "plain_text",
							text: "Ler Ros",
							emoji: true
						},
						value: "click_me_123"
					}
				]
			},
			{
				type: "divider"
			}
		]
	});
});

app.action("button_click", ({ body, ack, say }) => {
	// Acknowledge the action
	ack();
	say(`<@${body.user.id}> clicked the button`);
});

(async () => {
	// Start your app
	await app.start(process.env.PORT || 3000);

	console.log("⚡️ Bolt app is running!");
})();
