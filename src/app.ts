import express from "express";
import morgan from "morgan";
import router from "./routes/index";
import cors from "cors";
import { auth } from "express-openid-connect";
import * as dotenv from "dotenv";
dotenv.config();

const app = express();

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH0_SECRET,
  baseURL: process.env.BASE_URL || "http://localhost:3001",
  clientID: process.env.AUTH0_CLIENT_ID!,
  clientSecret: process.env.AUTH0_CLIENT_SECRET!,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL!,
  authorizationParams: {
    response_type: "code id_token",
    scope: "openid profile email"
  },
};

app.use(auth(config));
//options for cors midddleware
app.use(cors());

app.use(morgan("dev"));
app.use(express.json());

// API Routes
app.use("/", router);

// Root Route to handle Auth0 when user is logged using third-party app
app.get("/", (req, res) => {
  if (req.oidc.isAuthenticated()) {
    res.redirect("auth/profile");
  }
  res.redirect("/login");
});
export default app;
