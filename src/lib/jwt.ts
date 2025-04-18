import jwt, { JwtPayload } from "jsonwebtoken";

const accessTokenSecret = process.env.JWT_SECRET ?? "Study@#!234$";

// Define your JWT payload interface
export interface JWTPayload extends JwtPayload {
  uId: string;
  mobile: string;
  [key: string]: unknown;
}

// Generate Access Token
export async function generateAccessToken(user: JWTPayload): Promise<{
  token: string;
  expiry: Date;
}> {
  const payload: JWTPayload = {
    ...user,
    iat: Math.floor(Date.now() / 1000),
    nonce: Math.random().toString(36).slice(2),
  };

  const token = jwt.sign(payload, accessTokenSecret, { expiresIn: "8h" });

  const decoded = jwt.decode(token) as JwtPayload;

  return {
    token,
    expiry: new Date((decoded.exp ?? 0) * 1000),
  };
}

// Verify Access Token
export function verifyAccessToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, accessTokenSecret) as JWTPayload;
  } catch (error) {
    console.log(error);
    return null;
  }
}

// Decode Token (Optional)
export function decodeAccessToken(token: string): JWTPayload | null {
  const decoded = jwt.decode(token);
  return decoded as JWTPayload | null;
}
