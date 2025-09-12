"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePet = exports.updatePet = exports.createPet = exports.getPetsByUserId = exports.getPetById = exports.getAllPets = void 0;
const Pet_1 = require("../entities/Pet");
const User_1 = require("../entities/User");
const error_handler_1 = require("../utils/error.handler");
const getAllPets = async (req, res) => {
    try {
        const pets = await Pet_1.Pet.find({ relations: ["user"] });
        if (pets.length === 0)
            throw new error_handler_1.NotFoundError("Not found pets");
        res.status(200).send(pets);
    }
    catch (error) {
        (0, error_handler_1.handleHttpError)(res, error);
    }
};
exports.getAllPets = getAllPets;
const getPetById = async (req, res) => {
    const { id } = req.params;
    try {
        const pet = await Pet_1.Pet.findOneBy({ id });
        if (!pet)
            throw new error_handler_1.NotFoundError("Pet not found");
        res.status(200).send(pet);
    }
    catch (error) {
        (0, error_handler_1.handleHttpError)(res, error);
    }
};
exports.getPetById = getPetById;
const getPetsByUserId = async (req, res) => {
    const id = req.params.id;
    try {
        if (!id)
            return res.status(400).json({ message: "User ID not providedd" });
        const pets = await Pet_1.Pet.find({ where: { user: { id } } });
        if (pets.length === 0) {
            return res
                .status(404)
                .json({ message: "User pets not found with this ID." });
        }
        res.status(200).send(pets);
    }
    catch (error) {
        (0, error_handler_1.handleHttpError)(res, error);
    }
};
exports.getPetsByUserId = getPetsByUserId;
const createPet = async (req, res) => {
    const { size, specie, age, img, detail, area, sex, status, userId } = req.body;
    try {
        const searchUser = await User_1.User.find({
            where: [{ id: userId }],
        });
        const newPet = new Pet_1.Pet();
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
        console.log("newPET:", newPet);
        return res.status(200).send(newPet);
    }
    catch (error) {
        (0, error_handler_1.handleHttpError)(res, error);
    }
};
exports.createPet = createPet;
const updatePet = async (req, res) => {
    const { id } = req.params;
    try {
        const pet = await Pet_1.Pet.findOneBy({ id: id });
        if (!pet)
            throw new error_handler_1.NotFoundError("Pet not found");
        const updated = await Pet_1.Pet.update({ id: id }, req.body);
        return res.status(200).send(updated);
    }
    catch (error) {
        (0, error_handler_1.handleHttpError)(res, error);
    }
};
exports.updatePet = updatePet;
const deletePet = async (req, res) => {
    const { id } = req.params;
    try {
        const pet = await Pet_1.Pet.delete({ id: id });
        if (!pet)
            throw new error_handler_1.NotFoundError("Pet not found");
        return res.status(200).send("Pet deleted");
    }
    catch (error) {
        (0, error_handler_1.handleHttpError)(res, error);
    }
};
exports.deletePet = deletePet;
