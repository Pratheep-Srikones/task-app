import jwt from "jsonwebtoken";

export interface JWTToken {
  user_id: string;
  username: string;
}

export const generateJwtToken = (data: JWTToken) => {
  const maxAge = 24 * 60 * 60;
  if (!process.env.NEXT_PUBLIC_JWT_SECRET) {
    throw new Error("JWT secret is not defined");
  }
  return jwt.sign(data, process.env.NEXT_PUBLIC_JWT_SECRET, {
    expiresIn: maxAge,
  });
};
