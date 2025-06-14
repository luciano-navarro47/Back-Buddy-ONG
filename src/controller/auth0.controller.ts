import { Response, Request } from "express";
import { Status, User } from "../entities/User";
import { handleHttpError } from "../utils/error.handler";
// import { verifyToken } from "../utils/jwt.utils";

export const getAuth0User = async (req: Request, res: Response) => {
  const oauthId = req.query.id as string;
  try {
    if (!oauthId) return res.status(204).json({});
    const user = await User.findOne({ where: { auth0Sub: oauthId } });

    if (!user) return res.status(404).json({ error: "User not found" });
    res.status(200).json({ user });
  } catch (error) {
    handleHttpError(res, error);
  }
};
export const upsertAuth0User = async (req: Request, res: Response) => {
  const { first_name, last_name, email, username, auth0Sub, role } = req.body;

  try {
    let user = await User.findOneBy({ email });

    if (!user) {
      user = new User();
      user.first_name = first_name;
      user.last_name = last_name;
      user.email = email;
      user.username = username;
      user.auth0Sub = auth0Sub;
      user.role = role;
      user.status = Status.ACTIVE;

      await user.save();
    }

    res.status(200).json(user);
  } catch (error) {
    handleHttpError(res, error);
  }
};
