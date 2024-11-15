import express from "express";
import dotenv from "dotenv";

import authRouter from "./routes/auth.route";

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());

app.use("/api/auth", authRouter);

app.listen(PORT, () => {
	console.log(`Backend running on port : ${PORT}`);
});

console.log("One must imagine Sisyphus happy");
