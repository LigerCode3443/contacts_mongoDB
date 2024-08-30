import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const { JWT_SECRET } = process.env;

export const createToken = (payload) => {
  console.log(JWT_SECRET);

  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "24h",
  });
};

export const verifyToken = (token) => {
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    return { data: payload };
  } catch (error) {
    return error;
  }
};
