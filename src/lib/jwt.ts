import jwt from "jsonwebtoken";

const accessTokenSecret = process.env.JWT_SECRET ?? "Study@#!234$";

interface JWTPayload {
  uId: string;
  mobile: string;
  [key: string]: any;
}

// Generate Access Token
export async function generateAccessToken(user: JWTPayload): Promise<{
  token: string;
  expiry: Date;
}> {
  const payload = {
    ...user,
    iat: Math.floor(Date.now() / 1000),
    nonce: Math.random().toString(36).slice(2),
  };

  const token = jwt.sign(payload, accessTokenSecret, { expiresIn: "8h" });
  const decoded: any = jwt.decode(token);

  return {
    token,
    expiry: new Date(decoded.exp * 1000),
  };
}

// Verify Access Token
export function verifyAccessToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, accessTokenSecret) as JWTPayload;
  } catch (error) {
    return null;
  }
}

// Decode Token (Optional)
export function decodeAccessToken(token: string): any {
  return jwt.decode(token);
}