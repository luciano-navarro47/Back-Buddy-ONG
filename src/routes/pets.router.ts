import { Router } from "express";
import {
	getAllPets,
	getPetById,
	getPetsByUserId,
	createPet,
	updatePet,
	deletePet,
} from "../controller/pet.controller";

const petsRouter = Router();

petsRouter.get("/", getAllPets);
petsRouter.get("/:id", getPetById);
petsRouter.get("/user/:id", getPetsByUserId);
petsRouter.post("/", createPet);
petsRouter.put("/:id", updatePet);
petsRouter.delete("/:id", deletePet);

export default petsRouter;
