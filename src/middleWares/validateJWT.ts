import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";
import userModel from "../Models/userModel";

interface ExtendRequest extends Request {
  user?: any;
}

const validateJWT = (req: ExtendRequest, res: Response, next: NextFunction) => {
  const authorizationHeader = req.get("authorization");

  if (!authorizationHeader) {
    res.status(403).send("Authorization Header Not Provided!");
    return;
  }

  const token = authorizationHeader.split(" ")[1];

  if (!token) {
    res.status(403).send("Bearer token not found!");
    return;
  }

  jwt.verify(
    token,
    "9k60ekklbIcdkEwfoIrZoqyFqihyHkcNr68bRf2LnjILT86rwAGYohkwm3iwsBQp",
    async (err, payload) => {
      if (err) {
        res.status(403).send("Invalid token!");
        return;
      }

      if (!payload) {
        res.status(403).send("Invalid token paylod!");
        return;
      }

      const userPayload = payload as {
        firstName: string;
        lastName: string;
        email: string;
      };

      //Fetch user from database
      const user = await userModel.findOne({ email: userPayload.email });
      req.user = user;
      next();
    }
  );
};

export default validateJWT;
