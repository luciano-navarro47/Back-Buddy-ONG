import cors from "cors";
import morgan from "morgan";
import express from "express";
import cookieParser from "cookie-parser";
import { auth } from "express-openid-connect";
import router from "./routes/index";
import * as dotenv from "dotenv";
dotenv.config();

const isProdEnv = process.env.NODE_ENV === "production";
const app = express();

app.use(cookieParser());

app.use(
  cors({
    origin: isProdEnv
      ? "https://cilent-buddy-ong-801598852433.southamerica-east1.run.app"
      : "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
    credentials: true,
  })
);

const auth0Config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.AUTH0_SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.AUTH0_CLIENT_ID!,
  clientSecret: process.env.AUTH0_CLIENT_SECRET!,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL!,
  authorizationParams: {
    response_type: "code id_token",
    scope: "openid profile email",
    audience: "https://dev-oad6u8oyio8a678i.us.auth0.com/api/v2/",
  },
};

app.use(auth(auth0Config));

app.use(morgan("dev"));
app.use(express.json());

// API Routes
app.use("/", router);

export default app;
