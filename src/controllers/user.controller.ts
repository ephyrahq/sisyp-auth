import { Request, Response } from "express";
import { verifyToken } from "../utils/jwt";

export const getUserInfo = async (req: Request, res: Response) => {
	const { authorization } = req.headers;

	console.log(authorization);

	return res.status(203).json({ msg: "Yeet" });
};
