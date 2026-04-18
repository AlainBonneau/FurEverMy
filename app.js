import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { rateLimit } from "express-rate-limit";

import { router as apiRouter } from "./app/routers/router.js";
import { bodySanitizer } from "./app/middlewares/bodySanitizer.middleware.js";

const version = process.env.API_VERSION;
const globalRateLimitMax =
  Number.parseInt(process.env.GLOBAL_RATE_LIMIT_MAX, 10) || 500;

const app = express();
app.set("trust proxy", 1);

// Application security
// DDOS :
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: globalRateLimitMax,
    standardHeaders: true,
    legacyHeaders: false,
    message: { error: "Trop de requêtes. Réessaie plus tard." },
  })
);

app.get("/", (req, res) => {
  res.json({ hello: "Welcome to the FurEverHomeAPI" });
});

// CORS:
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
// Body parser:
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Body Sanitizer:
app.use(bodySanitizer);

app.use(`/api/v${version}`, apiRouter);

export default app;
