import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import authRouter from "./routes/auth.route";

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
app.use(express.json());

app.use("/api/auth", authRouter);

app.get("/", (req, res) => {
	res.send("Backend server is running!");
});

app.listen(PORT, () => {
	console.log(`Backend running on port : ${PORT}`);
});

console.log("One must imagine Sisyphus happy");
