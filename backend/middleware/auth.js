import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({});

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        message: "user not authenticatied",
        success: false,
      });
    }
    const decoded = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decoded) {
      return res.status(403).json({
        message: "invalid token",
        success: false,
      });
    };
    req.id=decoded.userId;
    next();
  } catch (error) {
    return res.status(500).json({
      message: "internal server error",
      success: false,
    });
  }
};

export default auth;