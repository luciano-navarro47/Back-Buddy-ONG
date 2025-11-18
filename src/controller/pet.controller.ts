import { Request, Response } from "express";
import { plainToInstance } from "class-transformer";
import { validateOrReject } from "class-validator";
import { Pet } from "../entities/Pet";
import { User } from "../entities/User";
import { NotFoundError, handleHttpError } from "../utils/error.handler";
import { CreatePetDTO } from "../dtos/CreatePet.dto";

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
  try {
    const petDto = plainToInstance(CreatePetDTO, req.body);
    await validateOrReject(petDto);

    const user = await User.findOne({ where: { id: petDto.userId } });
    if (!user) throw new NotFoundError("User not found");

    const newPet = Pet.create({
      ...petDto,
      user,
    });

    await newPet.save();
    res.status(201).send(newPet);
  } catch (error) {
    if (Array.isArray(error)) {
      return res.status(400).json({
        message: "Validation failed",
        errors: error.map((e) => Object.values(e.constraints)).flat(),
      });
    }
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
