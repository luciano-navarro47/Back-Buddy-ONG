import { Request, Response } from "express";
import { Pet } from "../Model/Pet";
import { User } from "../Model/User";
import { NotFoundError, handleHttpError } from "../utils/error.handler";

export const getAllPets = async (req: Request, res: Response) => {
  try {
    const pets = await Pet.find();
    res.status(200).send(pets);
  } catch (error) {
    handleHttpError(res, error);
  }
};

export const getPetId = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const pet = await Pet.findOneBy({ id });
    if (!pet) throw new NotFoundError("Pet not found");
    res.status(200).send(pet);
  } catch (error) {
    handleHttpError(res, error);
  }
};

export const createPet = async (req: Request, res: Response) => {
  const { size, specie, age, img, detail, area, sex, status, userId } =
    req.body;

  try {
    const searchUser = await User.find({
      where: [{ id: userId }],
    });

    const newPet = new Pet();
    newPet.size = size;
    newPet.specie = specie;
    newPet.age = age;
    newPet.img = img;
    newPet.detail = detail;
    newPet.area = area;
    newPet.sex = sex;
    newPet.status = status;
    newPet.user = searchUser[0];

    await newPet.save();
    return res.status(200).send(newPet);
  } catch (error) {
    handleHttpError(res, error);
  }
};

export const updatePet = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const pet = await Pet.findOneBy({ id: id });
    if (!pet) throw new NotFoundError("Pet not found");

    const updated = await Pet.update({ id: id }, req.body);
    return res.status(200).send(updated);
  } catch (error) {
    handleHttpError(res, error);
  }
};

export const deletePet = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const pet = await Pet.delete({ id: id });
    if(!pet) throw new NotFoundError("Pet not found");

    return res.status(200).send("Pet deleted");
  } catch (error) {
    handleHttpError(res, error);
  }
};
