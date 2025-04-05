import express from "express";
import morgan from "morgan";
import router from "./routes/index";
import cors from "cors";
import { auth } from "express-openid-connect";
import * as dotenv from "dotenv";
// import { cookie } from "express-validator";
dotenv.config();

const app = express();

// app.get('/', (req, res) => {
//   res.send('<h1>Servidor en ejecución</h1><p>Si ves este mensaje, ngrok está funcionando correctamente.</p>');
// });


app.use(cors({
  origin: "http://localhost:3000",
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
  credentials: true
}));

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
    scope: "openid profile email",
    audience: "https://dev-oad6u8oyio8a678i.us.auth0.com/api/v2/"
  }
};

app.use(auth(config));

app.use(morgan("dev"));
app.use(express.json());

// API Routes
app.use("/", router);

export default app;
