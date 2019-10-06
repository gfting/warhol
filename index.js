const { App } = require("@slack/bolt");

const app = new App({
	token: process.env.SLACK_BOT_TOKEN,
	signingSecret: process.env.SLACK_SIGNING_SECRET
});

// Listens to incoming messages that contain "hello"
app.message("hello warhol", ({ message, say }) => {
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
app.command("/warhol", async ({ payload, command, ack, say }) => {
	ack();
	console.log(payload);
	//say() sends a message to the channel where the event was triggered
	let result = await app.client.chat
		.postEphemeral({
			token: process.env.SLACK_BOT_TOKEN,
			channel: payload.channel_id,
			user: payload.user_id,
			attachments: [{ pretext: "pre-hello", text: "text-world" }],
			text: `Hello ${payload.user_id}, please select the message you could like to send:`,
			blocks: [
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
					block_id: "send_button",
					elements: [
						{
							type: "button",
							text: {
								type: "plain_text",
								text: "Farmhouse",
								emoji: true
							},
							value:
								"They do have some vegan options, like the roti and curry, plus they have a ton of salad stuff and noodles can be ordered without meat!! They have something for everyone here"
						},
						{
							type: "button",
							text: {
								type: "plain_text",
								text: "Kin Khao",
								emoji: true
							},
							value:
								"The sticky rice also goes wonderfully with the caramelized pork belly, which is absolutely melt-in-your-mouth and so soft."
						},
						{
							type: "button",
							text: {
								type: "plain_text",
								text: "Ler Ros",
								emoji: true
							},
							value:
								"I would really recommend the  Yum Koh Moo Yang - Spicy lime dressing and roasted quick marinated pork shoulder, basil leaves, chili & rice powder."
						}
					]
				},
				{
					type: "divider"
				},
				{
					type: "section",
					block_id: "direct_send",
					text: {
						type: "mrkdwn",
						text:
							"This would be a message text that you can send if this is clicked"
					},
					accessory: {
						type: "button",
						text: {
							type: "plain_text",
							text: "Send me!",
							emoji: true
						},
						value: "click_me_123"
					}
				}
			]
		})
		.then(response => {
			if (response.ok) {
				ack();
				console.log("Success!");
			}
		})
		.catch(error => {
			ack();
			console.log(error);
		});

	// say({
	// 	blocks: [
	// 		{
	// 			response_type: "ephemeral",
	// 			type: "section",
	// 			text: {
	// 				type: "mrkdwn",
	// 				text:
	// 					"Hello, Ruby! *What message would you like to send?*\n\n *Please select a restaurant:*"
	// 			}
	// 		},
	// 		{
	// 			type: "divider"
	// 		},
	// 		{
	// 			type: "section",
	// 			text: {
	// 				type: "mrkdwn",
	// 				text:
	// 					"*Farmhouse Thai Cuisine*\n:star::star::star::star: 1528 reviews\n They do have some vegan options, like the roti and curry, plus they have a ton of salad stuff and noodles can be ordered without meat!! They have something for everyone here"
	// 			}
	// 		},
	// 		{
	// 			type: "section",
	// 			text: {
	// 				type: "mrkdwn",
	// 				text:
	// 					"*Kin Khao*\n:star::star::star::star: 1638 reviews\n The sticky rice also goes wonderfully with the caramelized pork belly, which is absolutely melt-in-your-mouth and so soft."
	// 			}
	// 		},
	// 		{
	// 			type: "section",
	// 			text: {
	// 				type: "mrkdwn",
	// 				text:
	// 					"*Ler Ros*\n:star::star::star::star: 2082 reviews\n I would really recommend the  Yum Koh Moo Yang - Spicy lime dressing and roasted quick marinated pork shoulder, basil leaves, chili & rice powder."
	// 			}
	// 		},
	// 		{
	// 			type: "divider"
	// 		},
	// 		{
	// 			type: "actions",
	// 			block_id: "send_button",
	// 			elements: [
	// 				{
	// 					type: "button",
	// 					text: {
	// 						type: "plain_text",
	// 						text: "Farmhouse",
	// 						emoji: true
	// 					},
	// 					value:
	// 						"They do have some vegan options, like the roti and curry, plus they have a ton of salad stuff and noodles can be ordered without meat!! They have something for everyone here"
	// 				},
	// 				{
	// 					type: "button",
	// 					text: {
	// 						type: "plain_text",
	// 						text: "Kin Khao",
	// 						emoji: true
	// 					},
	// 					value:
	// 						"The sticky rice also goes wonderfully with the caramelized pork belly, which is absolutely melt-in-your-mouth and so soft."
	// 				},
	// 				{
	// 					type: "button",
	// 					text: {
	// 						type: "plain_text",
	// 						text: "Ler Ros",
	// 						emoji: true
	// 					},
	// 					value:
	// 						"I would really recommend the  Yum Koh Moo Yang - Spicy lime dressing and roasted quick marinated pork shoulder, basil leaves, chili & rice powder."
	// 				}
	// 			]
	// 		},
	// 		{
	// 			type: "divider"
	// 		},
	// 		{
	// 			type: "section",
	// 			text: {
	// 				type: "mrkdwn",
	// 				text:
	// 					"This would be a message text that you can send if this is clicked"
	// 			},
	// 			accessory: {
	// 				type: "button",
	// 				text: {
	// 					type: "plain_text",
	// 					text: "Send me!",
	// 					emoji: true
	// 				},
	// 				value: "click_me_123"
	// 			}
	// 		}
	// 	]
	// });
});

// Your middleware will only be called when block_id = "send_button"
app.action(
	{ block_id: "send_button" },
	async ({ action, ack, context, say }) => {
		ack();
		console.log(action);
		console.log(action.value);
		try {
			return say(action.value);
		} catch (error) {
			console.error(error);
		}
	}
);

app.action(
	{ block_id: "direct_send" },
	async ({ action, ack, context, say, payload }) => {
		ack();
		console.log(action);
		console.log(action.value);
		console.log(payload);
		try {
			app.client.chat.postMessage({
				token: process.env.USER_TOKEN,
				channel: payload.channel_id,
				as_user: true,
				text: action.value
			});
			//return say(action.value);
		} catch (error) {
			console.error(error);
		}
	}
);

// app.action("button_click", ({ body, ack, say }) => {
// 	// Acknowledge the action
// 	ack();
// 	say(`<@${body.user.id}> clicked the button`);
// });

(async () => {
	// Start your app
	await app.start(process.env.PORT || 3000);

	console.log("⚡️ Warhol bolt app is running!");
})();
