import "dotenv/config";
import express from "express";
import cors from "cors";
import { rateLimit } from "express-rate-limit";

import { router as apiRouter } from "./app/routers/router.js";
import { bodySanitizer } from "./app/middlewares/bodySanitizer.middleware.js";

const version = process.env.API_VERSION;

const app = express();

// Application security
// DDOS :
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100000,
    standardHeaders: true,
    legacyHeaders: false,
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

// Body Sanitizer:
app.use(bodySanitizer);

app.use(`/api/v${version}`, apiRouter);

export default app;
