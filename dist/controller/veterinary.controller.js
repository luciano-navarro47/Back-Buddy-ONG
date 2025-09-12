"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateVeterinary = exports.getVeterinaryId = exports.getAllVeterinary = exports.createVeterinary = void 0;
const Veterinary_1 = require("../entities/Veterinary");
const createVeterinary = async (req, res) => {
    const { name, description, email, image, phone, address, location } = req.body;
    try {
        const newVeterinary = new Veterinary_1.Veterinary();
        newVeterinary.name = name;
        newVeterinary.description = description;
        newVeterinary.email = email;
        newVeterinary.image = image;
        newVeterinary.phone = phone;
        newVeterinary.address = address;
        newVeterinary.location = location;
        await newVeterinary.save();
        res.status(200).send(newVeterinary);
    }
    catch (error) {
        if (error instanceof Error)
            return res.status(400).json({ message: error.message });
    }
};
exports.createVeterinary = createVeterinary;
const getAllVeterinary = async (req, res) => {
    try {
        const veterinary = await Veterinary_1.Veterinary.find();
        res.status(200).send(veterinary);
    }
    catch (error) {
        res.status(400).send(error);
    }
};
exports.getAllVeterinary = getAllVeterinary;
const getVeterinaryId = async (req, res) => {
    const { id } = req.params;
    try {
        const veterinary = await Veterinary_1.Veterinary.find({
            where: [{ id: id }],
        });
        if (!veterinary)
            res.status(400).send({ msg: `veterinary ${id} is not found` });
        else
            res.status(200).send(veterinary);
    }
    catch (error) {
        res.status(404).send({ msg: "Error getting data" });
    }
};
exports.getVeterinaryId = getVeterinaryId;
const updateVeterinary = async (req, res) => {
    const { id } = req.params;
    try {
        const veterinary = await Veterinary_1.Veterinary.findOneBy({ id: id });
        if (!veterinary)
            return res.status(404).json({ message: "veterinary not found" });
        await Veterinary_1.Veterinary.update({ id: id }, req.body);
        return res.sendStatus(204);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};
exports.updateVeterinary = updateVeterinary;
