import jwt from "jsonwebtoken";

interface UserPayload {
  userID: string;
  email: string;
  name: string;
}

const generateToken = (user: UserPayload) => {
  const accessToken = jwt.sign(user, process.env.JWT_SECRET || "default_secret_key", {
    expiresIn: process.env.JWT_EXPIRES_IN || "15m",
  });
  
  const refreshToken = jwt.sign(
    { userID: user.userID },
    process.env.JWT_REFRESH_SECRET || "default_refresh_secret",
    { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d" }
  );
  
  return { accessToken, refreshToken };
};

const verifyToken = (token: string): UserPayload | null => {
  try {
    return jwt.verify(
      token,
      process.env.JWT_SECRET || "default_secret_key"
    ) as UserPayload;
  } catch (error) {
    return null;
  }
};

const verifyRefreshToken = (token: string): { userID: string } | null => {
  try {
    return jwt.verify(
      token,
      process.env.JWT_REFRESH_SECRET || "default_refresh_secret"
    ) as { userID: string };
  } catch (error) {
    return null;
  }
};

export { generateToken, verifyToken, verifyRefreshToken };
export type { UserPayload };
