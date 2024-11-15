// Authentication Route
import express from "express";
import { googleAuth } from "../controllers/auth.controller";

const router = express.Router();

router.post("/api/auth/google/callback", googleAuth as any);

export default router;
