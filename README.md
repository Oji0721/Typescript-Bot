
# Hi, I'm Oji0721! 👋


I'm a Discord Bot Developer and here is my bot handler


# Discord.JS V14 Handler

A discord.js handler which support slash commands , events and more...

## **Installation | How to use the Bot**

**1.** Install [Node.js v16](https://nodejs.org/en/) or higher

**2.** Download this repo and unzip it | or git clone it

**3.** Create a edit **`.env.example`** to **`.env`**

**4.** Fill everything in **`.env`**

**5.** After filling everything in .env type in shell **`npm install`**

**6.** Start the bot with **`npm run start`**. If you want to compile you code run **`npm run build`** then run it with **`npm run start:prod`**
<br/>

### _Modify - .env_

```txt
botToken=
guildId=
mongooseConnectionString=
```

## Handler Features

- Easy to use Handler
- Support event Handler
- Slash commands support
- Based on [Discord.js v14 Documents](https://deploy-preview-1011--discordjs-guide.netlify.app/additional-info/changes-in-v14.html)
- Provied code snipet for commands
- Support sub directory in commands folder
- Support code suggestions in Handler


## Feedback

Just message me on GitHub


## Usage/Examples

- For Slash Command
```js
import { Command } from '../../structures/Command';

export default new Command({
  name: '',
  description: '',
  type: 'ChatInput',
  
  run: async ({ interaction }) => {
    // Code
  },
});
```

- For Event

```ts
import { Event } from "../structures/Event";

export default new Event('EVENT-NAME', async (...args) => {
  // code
})
```

## License

[ISC LICENSE](https://choosealicense.com/licenses/isc/)

# Thanks For Using My Handler Please Give a Star
