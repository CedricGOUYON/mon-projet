import type { RequestHandler } from "express";
import argon2 from "argon2";

const hashPassword: RequestHandler = async (req, res, next) => {
  try {
    const hash = await argon2.hash(req.body.password);
    req.body.password = hash;
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json("Error while hashing the password");
  }
};

export default { hashPassword };
