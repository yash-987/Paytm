const expressAsyncHandler = require("express-async-handler");
const { DecodeToken } = require("../config/token");
const User = require("../models/userModel");


const protect = expressAsyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer "))
    return res.status(403).json({ message: "Invalid Token" });

  const token = authHeader.split(" ")[1];
  try {
    const decoded = DecodeToken(token);
  
    

    if (decoded.id) {
      req.userId = decoded.id;
      next();
    } else {
      return res.status(403).json({message:"Can't get userId"});
    }
  } catch (error) {
    return res.status(403).json({ message: "No token" });
  }
});

module.exports = protect;

