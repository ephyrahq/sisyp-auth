import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { auth } from "./auth";
import { toNodeHandler } from "better-auth/node";

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();

app.use(
	cors({
		origin: process.env.FRONTEND_URL || "http://localhost:3000", // Next.js frontend URL
		methods: ["GET", "POST"],
		credentials: true, // Allow sending cookies if needed
	})
);

app.use((req, _res, next) => {
	console.log(
		`Incoming request: ${req.method} ~ ${
			req.url
		} [${new Date().toLocaleTimeString("en-US", { hour12: false })}]`
	);
	next();
});

app.get("/", (req, res) => {
	res.send("Authentication server is running!");
});

app.all("/api/auth/*", toNodeHandler(auth));

app.use(express.json());

app.listen(PORT, () => {
	console.log(`Backend running on port : ${PORT}`);
});

console.log("One must imagine Sisyphus happy");
