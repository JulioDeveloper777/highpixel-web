import express from 'express';
import { adaptMiddleware } from "@core/infra/adapters/ExpressMiddlewareAdapter";
import { adaptRoute } from "@core/infra/adapters/ExpressRouteAdapter";
import { makeGetUpdatesPerDate } from "@modules/game/useCases/GetUpdatesPeerDate";
import { makeAuthenticationMiddleware } from "@infra/http/factories/makeAuthenticationMiddleware";
// import multer from "multer";

const Game = express.Router();

Game.use(adaptMiddleware(makeAuthenticationMiddleware()));

Game.get('/updates/after/:date', adaptRoute(makeGetUpdatesPerDate()));

// const upload = multer();

export { Game };

