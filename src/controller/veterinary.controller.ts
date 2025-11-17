import { Request, Response } from "express";
import { Veterinary } from "../entities/Veterinary";
import { CreateVeterinaryDTO } from "../dtos/CreateVeterinary.dto";
import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";

export const createVeterinary = async (req: Request, res: Response) => {
  try {
    // Transformar y validar datos de entrada
    const dto = plainToInstance(CreateVeterinaryDTO, req.body);
    const errors = await validate(dto);

    if (errors.length > 0) {
      return res.status(400).json({
        message: "Errores de validación",
        errors: errors.map(err => err.constraints),
      });
    }

    const newVeterinary = Veterinary.create(Object.assign(new Veterinary(), dto));
    await newVeterinary.save();

    return res.status(201).json(newVeterinary);
  } catch (error) {
    console.error(error);
    if (error instanceof Error)
      return res.status(500).json({ message: error.message });
  }
};

export const getAllVeterinary = async (req: Request, res: Response) => {
  try {
    const veterinaries = await Veterinary.find();
    return res.status(200).json(veterinaries);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al obtener veterinarias" });
  }
};

export const getVeterinaryId = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const veterinary = await Veterinary.find({
      where: [{ id: id }],
    });

    if (!veterinary)
      res.status(400).send({ msg: `veterinary ${id} is not found` });
    else res.status(200).send(veterinary);
  } catch (error) {
    res.status(404).send({ msg: "Error getting data" });
  }
};

export const updateVeterinary = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const veterinary = await Veterinary.findOneBy({ id: id });
    if (!veterinary)
      return res.status(404).json({ message: "veterinary not found" });

    await Veterinary.update({ id: id }, req.body);
    return res.sendStatus(204);
  } catch (error) {
    if (error instanceof Error) {
      return res.status(500).json({ message: error.message });
    }
  }
};
