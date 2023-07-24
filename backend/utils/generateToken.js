import jwt from "jsonwebtoken";

/**
 * Generates a token and sets it as a cookie in the response.
 *
 * @param {object} res - The response object.
 * @param {string} userId - The user ID.
 */
const generateToken = (res, userId) => {
  // Generate a JWT token with the user ID using the JWT_SECRET from the environment variables
  const token = jwt.sign({ userId }, `${process.env.JWT_SECRET}`, {
    expiresIn: "30d",
  });

  // Set the JWT token as a cookie in the response
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development", // Use secure cookies in production
    sameSite: "strict", // Prevent CSRF attacks
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });
};

export default generateToken;
