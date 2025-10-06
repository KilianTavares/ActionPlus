import jwt from "jsonwebtoken";

interface UserPayload {
  userID: string;
  email: string;
  name: string;
}

const generateToken = (user: UserPayload) => {
  return jwt.sign(
    user,
    process.env.JWT_SECRET || "default_secret_key",
    { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
  );
};

const verifyToken = (token: string): UserPayload | null => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET || "default_secret_key") as UserPayload;
  } catch (error) {
    return null;
  }
};

export { generateToken, verifyToken };
export type { UserPayload };
