// Authentication Controller
import { OAuth2Client } from "google-auth-library";
import { Request, Response } from "express";
import { generateToken } from "../utils/jwt";
import { prisma } from "../prisma.client";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleAuth = async (req: Request, res: Response) => {
	const { token } = req.body;

	if (!token)
		return res
			.status(400)
			.json({ error: "No token provided. Token is required" });

	try {
		const ticket = await client.verifyIdToken({
			idToken: token,
			audience: process.env.GOOGLE_CLIENT_ID,
		});

		const payload = ticket.getPayload();

		if (!payload || !payload.email) {
			res.status(500).json({ error: "Invalid token" });
			return;
		}

		const email = payload.email;
		const name = payload.name;

		let user = await prisma.user.findUnique({ where: { email } });

		// Create a new user in the database if no user with the specified email exists.
		if (!user) {
			user = await prisma.user.create({
				data: {
					email,
					name,
					role: email?.endsWith(process.env.INSTITUTE_DOMAIN as string)
						? "STUDENT"
						: "TEACHER",
					googleId: payload.sub,
				},
			});
		}

		// Generate JWT Token with the userId, email & role as the payload.
		const jwtToken = generateToken({
			userId: user.id,
			email: user.email,
			role: user.role,
		});

		return res
			.json({
				token: jwtToken,
				user,
				message: "Authenticated successfully",
			})
			.status(202);
	} catch (error) {
		console.log("Error encountered while authentication", error);
		return res
			.status(500)
			.json({ error: `Authentication failed. Error : ${error}` });
	}
};
