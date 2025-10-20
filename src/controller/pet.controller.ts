import { Request, Response } from "express";
import { Pet } from "../entities/Pet";
import { User } from "../entities/User";
import { NotFoundError, handleHttpError } from "../utils/error.handler";

export const getAllPets = async (req: Request, res: Response) => {
  try {
    const pets = await Pet.find({ relations: ["user"] });
    if (pets.length === 0) throw new NotFoundError("Not found pets");
    res.status(200).send(pets);
  } catch (error) {
    handleHttpError(res, error);
  }
};

export const getPetById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const pet = await Pet.findOneBy({ id });
    if (!pet) throw new NotFoundError("Pet not found");
    res.status(200).send(pet);
  } catch (error) {
    handleHttpError(res, error);
  }
};

export const getPetsByUserId = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    if (!id) return res.status(400).json({ message: "User ID not providedd" });

    const pets = await Pet.find({ where: { user: { id } } });

    if (pets.length === 0) {
      return res
        .status(404)
        .json({ message: "User pets not found with this ID." });
    }

    res.status(200).send(pets);
  } catch (error) {
    handleHttpError(res, error);
  }
};

export const createPet = async (req: Request, res: Response) => {
  const {
    name,
    size,
    specie,
    age,
    images,
    videos,
    detail,
    sex,
    caseStatus,
    postType,
    city,
    street,
    number,
    userId,
  } = req.body;

  // TO DO: create a file and export here the Pet.dto class

  try {
    const searchUser = await User.find({
      where: [{ id: userId }],
    });

    const newPet = new Pet();
    newPet.name = name;
    newPet.size = size;
    newPet.specie = specie;
    newPet.age = age;
    newPet.images = images;
    newPet.street = street;
    newPet.city = city;
    newPet.number = number;
    newPet.videos = videos;
    newPet.postType = postType;
    newPet.caseStatus = caseStatus;
    newPet.detail = detail;
    newPet.sex = sex;
    newPet.user = searchUser[0];

    console.log("newPET:", newPet);

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
    if (!pet) throw new NotFoundError("Pet not found");

    return res.status(200).send("Pet deleted");
  } catch (error) {
    handleHttpError(res, error);
  }
};
