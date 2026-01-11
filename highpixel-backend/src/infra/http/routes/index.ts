import { Account } from "@infra/http/routes/AccountRoutes";
import { Admin } from "@infra/http/routes/AdminRoutes";
import { Game } from "@infra/http/routes/GameRoutes";
import { Player } from "@infra/http/routes/PlayerRoutes";
import { Social } from "@infra/http/routes/SocialRoutes";
import express, { Request, Response } from "express";
import { Analytics } from "./Analytics";
import { High } from "./HighRoutes";

const Router = express.Router();

Router.use('/v1/account', Account);
Router.use('/v1/social', Social);
Router.use('/v1/player', Player);
Router.use('/v1/high', High);
Router.use('/v1/', Analytics);
Router.use('/v1/game', Game);
Router.use('/v1/admin', Admin);

Router.get('*', (req: Request, res: Response) => {
  res.status(404).send("<img src='https://media.tenor.com/XWr6vfqH7WEAAAAC/tentando-n%C3%A3o-rir-risada.gif'/> <br><br> Nada que você já não tenha visto, apenas um servidor web.");
});

export { Router };
