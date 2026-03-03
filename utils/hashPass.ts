// hashing.js
import bcrypt from "bcryptjs";

/**
 * Hashes a plain-text password using bcrypt.
 * @param {string} password - The plain-text password to hash.
 * @param {number} saltRounds - The number of salt rounds for bcrypt hashing (default is 10).
 * @returns {string} - The hashed password.
 */
export const hashPassword = async (password: string, saltRounds = 10) => {
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error: any) {
    throw new Error("Error hashing password: " + error.message);
  }
};
