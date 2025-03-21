import { hash, compare } from "bcryptjs";

export const encrypt = async (pass: string) => {
  const passwordHashed = await hash(pass, 10);
  return passwordHashed;
};

export const verified = async (pass: string, passHash: string) => {
  const isCorrect = await compare(pass, passHash);

  if(isCorrect) return true;
  return false;
};
