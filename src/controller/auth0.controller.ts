import { Response, Request } from "express";
import { handleHttpError } from "../utils/error.handler";
import { verifyToken } from "../utils/jwt.utils";
export const registerAuth0User = async (req: Request, res: Response) => {
    try {
        console.log("WE CAN SAVE AUTH0 USER", req.body);
        // const authHeader = req.headers.authorization;
        
        // if(!authHeader && !authHeader?.startsWith("Bearer ")){
        //   return res.status(401).json({ message: "Unauthorized." });
        // }

        // const token = authHeader.split(" ")[1]
        // const decoded = verifyToken(token);
        // console.log("DECODED: ", decoded);

        // if(!decoded || typeof decoded === "string") {
        //   return res.status(401).json({ message: "Invalid token." });
        // }

        // res.status(200).json({ user: decoded });

    } catch (error) {
      handleHttpError(res, error);
    }
}