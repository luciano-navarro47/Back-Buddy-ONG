import { Request, Response, Router } from "express";
import { requiresAuth } from "express-openid-connect";
import { handleHttpError } from "../utils/error.handler";

const auth0Router = Router();


auth0Router.get("/profile", requiresAuth(), (req, res) => {
    console.log("PROFILE: ", req.oidc.user);
    try {
        res.send({
            user: req.oidc.user,
            token: req.oidc.accessToken?.access_token
        });
        
    } catch (error) {
      handleHttpError(res, error);
    }
});

export default auth0Router;