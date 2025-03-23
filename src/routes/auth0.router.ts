import { Router } from "express";
import { requiresAuth } from "express-openid-connect";
import { getUserProfile } from "../controller/auth0.controller";

const auth0Router = Router();

auth0Router.get("/me", requiresAuth(), getUserProfile);

export default auth0Router;
