import { Router } from "express";
import {
	getAllPets,
	getPetById,
	createPet,
	updatePet,
	deletePet,
} from "../controller/pet.controller";

const petsRouter = Router();

petsRouter.get("/", getAllPets);
petsRouter.get("/:id", getPetById);
petsRouter.post("/", createPet);
petsRouter.put("/:id", updatePet);
petsRouter.delete("/:id", deletePet);

export default petsRouter;
