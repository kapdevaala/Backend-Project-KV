const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");

exports.auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token is missing",
      });
    }
    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      console.log("decode= ", decode.accountType);
      req.accountType = decode.accountType;
      req.id = decode.id;
      req.accountType = decode.accountType;
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: "token is invalid",
      });
    }
    next();
  } catch (error) {
    console.log("Error:", error);
    return res.status(401).json({
      success: false,
      message: "Something went wrong while validating the token",
    });
  }
};

exports.isAdmin = async (req, res, next) => {
  try {
    if (req.accountType !== "Admin") {
      return res.status(401).json({
        success: false,
        message: "This is a protected route for Admin only",
      });
    }
    next();
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      success: false,
      message: "User role cannot be verified, please try again",
    });
  }
};
