// utils/jose.ts
import { SignJWT, jwtVerify, type JWTPayload } from "jose";

const getSecretKey = (secretKey: string): Uint8Array => {
  if (!secretKey || secretKey.trim().length === 0) {
    throw new Error("JWT secret key must not be empty");
  }
  return new TextEncoder().encode(secretKey);
};

// Generate Access Token (short-lived: 15 min)
export const generateAccessToken = async (
  payload: JWTPayload,
  secretKey: string,
): Promise<string> => {
  const key = getSecretKey(secretKey);

  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256", type: "at+jwt" })
    .setIssuedAt()
    .setExpirationTime("15m")
    .sign(key);

  return token;
};

// Generate Refresh Token (long-lived: 7 days, self-contained)
export const generateRefreshToken = async (
  payload: JWTPayload,
  secretKey: string,
): Promise<string> => {
  const key = getSecretKey(secretKey);

  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256", type: "rt+jwt" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(key);

  return token;
};

// Verify Access Token
export const verifyAccessToken = async (
  token: string,
  secretKey: string,
): Promise<{ payload: JWTPayload; protectedHeader: Record<string, any> }> => {
  const key = new TextEncoder().encode(secretKey);

  const { payload, protectedHeader } = await jwtVerify(token, key);

  if (protectedHeader.type !== "at+jwt") {
    throw new Error("Invalid token type: expected access token");
  }

  return { payload, protectedHeader };
};

export const verifyRefreshToken = async (
  token: string,
  secretKey: string,
): Promise<{ payload: JWTPayload; protectedHeader: Record<string, any> }> => {
  const key = new TextEncoder().encode(secretKey);

  const { payload, protectedHeader } = await jwtVerify(token, key);

  if (protectedHeader.type !== "rt+jwt") {
    throw new Error("Invalid token type: expected refresh token");
  }

  return { payload, protectedHeader };
};

export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}
// Generate Token Pair
export const generateTokenPair = async (
  payload: JWTPayload,
  secretKey: string,
): Promise<TokenPair> => {
  const accessToken = await generateAccessToken(payload, secretKey);
  const refreshToken = await generateRefreshToken(payload, secretKey);

  return { accessToken, refreshToken };
};
