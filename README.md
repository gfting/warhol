# warhol
Provides canned responses for slack through an ephemeral message menu on slash command /warhol. Written using @slack/bolt, the Slack WebAPI, Node.js, and hosted on Heroku.
# Demo
[![Demonstration in Channel](preview-pic.jpg)](https://youtu.be/qnQEZWLjwyA "Demonstration in Channel")
# Motivations
- One day, there was a message in a Slack workspace asking about bots that could post messages that make it look like it's coming from the user themselves
  - However, the only options were paid which was unfortunate
- I wanted to create a free version and also figure out more about how Slack bots worked because I was curious as to how they functioned and what went into creating the workflow
# Getting Started
- The only dependency is `@slack/bolt`, so you can do `npm i` and then `npm run start`.
  
## Slack Initial Setup Flow
- You will need to also create a .env file that contains a `SLACK_BOT_TOKEN`, a `USER_TOKEN`, and a `SLACK_SIGNING_SECRET`
- Go to `api.slack.com` and then create your own application in the workspace that you desire, and then change the permissions so that it generates the OAuth tokens. On your bot's home page, you should now see the secret tokens I mentioned above.
- You'll have to turn on Interactive Components and Slash Commands, and also change the bot's permissions so that it can read and write across several channels. 
- The default URL that it the events/interaction get sent to is `/slack/events`, so I would suggest setting that as the Request URL for your Interactive Components and Slash Commands
- Just installing/doing `npm run start` on its own will not really be able to do anything, as there isn't anywhere for your commands to send information.
  - You could set up a development flow with `ngrok`, but I wanted to try out using Heroku for managing my deploys for this project so I went with actually pushing to an automatically deploying heroku-staging branch
- Anything that gets `console.log()`ed in Slack gets sent to the server, so you'd have to check the logs on whatever hosting you are using. I personally used Heroku (my first time using Heroku), but it's totally up to you! 
  - Store the secrets somewhere secure, as these tokens are actually pretty powerful in terms of what actions you can do. I initially had a global `hello warhol` command across all channels and DMs that would create a clicker button everywhere

## Features
- Warhol listens for two main kick-off actions:
  - A slash command `/warhol`
  - Any message in any channel that includes the text `hello warhol`
### `/warhol`
- After the slash command happens, warhol grabs the context of the message and then presents an ephemeral menu for the user–that is, a menu of options that's only visible to the user
- The user can then click on any of the menu buttons, which triggers another action listener
  - On receiving the action, the action listener will grab the user's auth token and then send the value of the corresponding button to the original location of the message, but it appears like it's the user–this is officially called "user impersonation" according to the docs. 
### `hello warhol`
- This mostly came from the Bolt initial tutorial; warhol just listens for messages in channels that include `hello warhol` somewhere in it and then it'll send back a message in the channel with a button that on-click sends an action back to warhol
  - When warhol gets this action, it'll send a message in the channel with the user that clicked the button such as `@Gabriel Ting clicked the button`

# Contributing
- Pull requests are welcome. Since the Bolt framework is relatively new, I found that weren't a lot of great examples on things like ephemeral messages using Bolt, so I combined elements of Bolt and the Slack Web API
# Next Steps
- An interesting action is that while warhol can listen for things across all channels, it has trouble impersonating outside of defined channels. 
  - I want to make it easier to integrate across a workspace
- Ephemeral messages are nice, but they're harder to delete because they have less identifiers on them. The Bolt framework mentioned an easier way to delete them in a `response()` call, but since the framework is relatively new, my interpretation of the documentation kept on failing.

# License
[MIT](LICENSE)