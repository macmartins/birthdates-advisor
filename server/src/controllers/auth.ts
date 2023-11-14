import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export function login(_req: Request, res: Response) {
  try {
    const token = jwt.sign(
      process.env.PRIVATE_KEY ?? "",
      process.env.PRIVATE_KEY ?? ""
    );
    return res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    return res.json({ msg: error });
  }
}

export function validate(req: Request, res: Response, next: NextFunction) {
  const [, token] = req.headers.authorization?.split(" ") || ["", ""];
  if (!!!token) {
    return res.status(401).json({ msg: "Access denied. No token provided." });
  }

  try {
    const payload = jwt.verify(token, process.env.PRIVATE_KEY ?? "");
    if (payload === process.env.PRIVATE_KEY) {
      return next();
    } else {
      return res.status(401).json({ msg: "Invalid token" });
    }
  } catch (error) {
    console.error(error);
    return res.status(401).json({ msg: "Invalid token" });
  }
}
