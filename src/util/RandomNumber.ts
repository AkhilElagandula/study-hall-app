import crypto from "crypto";

/**
 * Generate a secure OTP of specified length
 * @param digits number of digits (between 1 and 12 recommended)
 * @returns numeric OTP
 */
export async function generateOtp(digits: number): Promise<number> {
  if (digits < 1 || digits > 12) {
    throw new Error("OTP length must be between 1 and 12 digits.");
  }

  const max = Math.pow(10, digits);
  const min = Math.pow(10, digits - 1);

  const randomBytes = crypto.randomBytes(6);
  const randomValue = randomBytes.readUIntLE(0, 6);
  const otp = (randomValue % (max - min)) + min;

  return otp;
}
