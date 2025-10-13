import "./types/express-augmentations";
import cron from "node-cron";
import express, { NextFunction, Request, Response } from "express";
import { createServer } from "http";
import cors, { CorsOptions } from "cors";
import userRoutes from "./routes/userRoutes";
import roomRoutes from "./routes/roomRoutes";
import { initWebSocket } from "./wsHandler";
import morgan from "morgan";
import path from "path";
import { rateLimit } from "express-rate-limit";
import axios from "axios";
import dotenv from "dotenv";
import rfs from "rotating-file-stream"; // fixed import

dotenv.config();

const app = express();
app.set("trust proxy", 1); // needed for Render

// 📜 Rate limiter
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 50,
  standardHeaders: "draft-8",
  legacyHeaders: false,
});

// 🗂️ Logging setup
const logDir = path.join(__dirname, "logs");
const logStream = rfs.createStream("requestLogs.log", {
  interval: "1d",
  path: logDir,
});
app.use(morgan("common", { stream: logStream }));

// 🌍 Allowed CORS origins
const allowedOrigins = [
  "https://excali-sketch-frontend.vercel.app",
  "https://www.excali-sketch1.shop",
  "https://excali-sketch1.shop",
  "http://localhost:3000",
];

// ✅ CORS configuration
const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // allow SSR, Postman, etc.

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.error(`❌ CORS blocked request from origin: ${origin}`);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 200,
};

// 🧠 Apply middlewares
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use(limiter);
app.use(express.json());

// 🛠️ Routes
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ msg: "Hello there 👋 Backend is running fine!" });
});

app.use("/user", userRoutes);
app.use("/room", roomRoutes);

// ⚙️ Server setup
const PORT: number = parseInt(process.env.PORT ?? "5000", 10);
const server = createServer(app);

// 🔗 Initialize WebSocket
initWebSocket(server);

server.listen(PORT, () => {
  console.log(`🚀 Server is listening on port ${PORT}`);
});

// 🕒 Cron job - ping backend every 14 minutes to keep it awake
const PING_URL = process.env.PING_URL ?? "https://excali-sketch-backend.onrender.com";

cron.schedule("*/14 * * * *", async () => {
  try {
    const res = await axios.get(PING_URL);
    console.log(`🔁 Ping successful: ${res.data?.msg ?? res.status}`);
  } catch (error: any) {
    console.error("⚠️ Cron ping failed:", error.message);
  }
});
