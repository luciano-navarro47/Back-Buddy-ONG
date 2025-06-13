import { hash, compare } from "bcryptjs";

export const encrypt = async (pass: string) => {
  return await hash(pass, 10);
};

export const verify = async (pass: string, passHash: string) => {
  return await compare(pass, passHash);
};
