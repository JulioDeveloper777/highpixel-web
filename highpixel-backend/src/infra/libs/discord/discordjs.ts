import { REST } from '@discordjs/rest';

export default new REST({ version: '10' }).setToken(
  String(process.env.BOT_DISCORD_TOKEN)
);