import express from "express";
import { getUserInfo } from "../controllers/user.controller";

const router = express.Router();

router.get("/info", getUserInfo as any);

export default router;
