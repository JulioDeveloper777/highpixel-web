import { Webhook } from 'discord-webhook-node';

export const interview = new Webhook(String(process.env.WEBHOOK_DISCORD_INTERVIEW));