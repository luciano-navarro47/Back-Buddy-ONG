import { Router } from "express";
import { requiresAuth } from "express-openid-connect";
import { registerAuth0User } from "../controller/auth0.controller";

const auth0Router = Router();

auth0Router.get("/register", requiresAuth, registerAuth0User);

export default auth0Router;
