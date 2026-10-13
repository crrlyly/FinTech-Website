import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import session from "express-session";
import { createClient } from "redis";
import { RedisStore } from "connect-redis";

import authRoutes from "./routes/authRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import budgetRoutes from "./routes/budgetRoutes.js";
import goalRoutes from "./routes/goalRoutes.js";

import { startMonthlyBudgetScheduler } from "./jobs/monthlyBudgetJob.js";

dotenv.config({
  path: new URL("./.env", import.meta.url),
});

const app = express();

const redisClient = createClient({
  url: process.env.REDIS_URL,
});

redisClient.on("error", (error) => {
  console.error("REDIS ERROR:", error);
});

await redisClient.connect();

const redisStore = new RedisStore({
  client: redisClient,
  prefix: "fintech:",
});

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());

// Session middleware
app.use(
  session({
    name: "fintech.sid",

    store: redisStore,

    secret: process.env.SESSION_SECRET,

    resave: false,

    saveUninitialized: false,

    cookie: {
      httpOnly: true,
      secure: false, // Local HTTP development only
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24,
    },
  }),
);

app.use("/api/auth", authRoutes);
app.use("/api/transaction", transactionRoutes);
app.use("/api/budget", budgetRoutes);
app.use("/api/goal", goalRoutes);

app.use(errorHandler); //must come after routes

app.get("/api/test-session", (req, res) => {
  if (!req.session.visits) {
    req.session.visits = 1;
  } else {
    req.session.visits++;
  }

  res.json({
    visits: req.session.visits,
  });
});

startMonthlyBudgetScheduler();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
