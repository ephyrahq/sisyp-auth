// Authentication Controller
import { OAuth2Client } from "google-auth-library";
import { Request, Response } from "express";
import { generateToken } from "../utils/jwt";
import { prisma } from "../prisma.client";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleAuth = async (req: Request, res: Response) => {
	const { userInfo } = req.body;
	console.log(userInfo);

	if (!userInfo) return res.json({ error: "No user specified" }).status(400);

	const { name, email, sub } = userInfo;

	try {
		let user = await prisma.user.findUnique({ where: { email } });

		// Create a new user in the database if no user with the specified email exists.
		if (!user) {
			console.log("Creating new user.");
			user = await prisma.user.create({
				data: {
					email,
					name,
					googleId: sub,
				},
			});
		}

		const token = generateToken({
			name,
			email,
			role: user.role,
		});

		return res
			.json({ token, user, message: "Authenticated successfully!" })
			.status(200);
	} catch (error) {
		console.log("Error occured", error);
		return res.status(400).json({ error });
	}
};
