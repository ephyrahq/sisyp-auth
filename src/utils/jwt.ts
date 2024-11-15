import jwt from "jsonwebtoken";

export const generateToken = (payload: object): string => {
	return jwt.sign(payload, process.env.JWT_SECRET as string);
};

export const verifyToken = (token: string) => {
	return jwt.verify(token, process.env.JWT_SECRET as string);
};
