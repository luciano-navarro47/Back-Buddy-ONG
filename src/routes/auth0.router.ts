import { Router } from "express";
import { requiresAuth } from "express-openid-connect";
import { handleHttpError } from "../utils/error.handler";

const auth0Router = Router();

auth0Router.get("/profile", requiresAuth(), (req, res) => {
  console.log("USERRR: ", req.oidc.user);
  console.log("TOKENN: ", req.oidc.accessToken?.access_token);
  try {
      const user = req.oidc.user;
      const token = req.oidc.accessToken?.access_token;

      if(!user || !token){
        return res.status(401).json({ message: "Unauthorized."});
      }
      
      // Config HTTPOnly cookie to store the token securely
      res.cookie("auth_token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        expires: new Date(Date.now() + 900000)
      })

      res.status(200).json({ user });
  } catch (error) {
    handleHttpError(res, error);
  }
});

export default auth0Router;
