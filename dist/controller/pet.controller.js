"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePet = exports.updatePet = exports.createPet = exports.getPetId = exports.getAllPets = void 0;
const Pet_1 = require("../Model/Pet");
const User_1 = require("../Model/User");
const error_handler_1 = require("../utils/error.handler");
const getAllPets = async (req, res) => {
    try {
        const pets = await Pet_1.Pet.find();
        res.status(200).send(pets);
    }
    catch (error) {
        (0, error_handler_1.handleHttpError)(res, "ERROR_GET_ALL_PETS");
    }
};
exports.getAllPets = getAllPets;
const getPetId = async (req, res) => {
    const { id } = req.params;
    try {
        const pet = await Pet_1.Pet.findOneBy({ id });
        if (!pet)
            throw new error_handler_1.NotFoundError(`No pet found with ID: ${id}`);
        else
            res.status(200).send(pet);
    }
    catch (error) {
        (0, error_handler_1.handleHttpError)(res, "ERROR_GET_PET");
    }
};
exports.getPetId = getPetId;
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
        return res.status(200).send(newPet);
    }
    catch (error) {
        if (error instanceof Error)
            (0, error_handler_1.handleHttpError)(res, "ERROR_CREATE_PET");
    }
};
exports.createPet = createPet;
const updatePet = async (req, res) => {
    const { id } = req.params;
    try {
        const pet = await Pet_1.Pet.findOneBy({ id: id });
        if (!pet)
            throw new error_handler_1.NotFoundError(`No pet found with ID: ${id}`);
        await Pet_1.Pet.update({ id: id }, req.body);
        return res.sendStatus(204);
    }
    catch (error) {
        (0, error_handler_1.handleHttpError)(res, "ERROR_UPDATE_PET");
    }
};
exports.updatePet = updatePet;
const deletePet = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await Pet_1.Pet.delete({ id: id });
        return res.send(`User deleted`);
    }
    catch (error) {
        if (error instanceof Error) {
            (0, error_handler_1.handleHttpError)(res, "ERROR_DELETE_PET");
        }
    }
};
exports.deletePet = deletePet;
