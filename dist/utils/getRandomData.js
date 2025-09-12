"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVeterinaryRandomData = exports.getUserRandomData = exports.getPetRandomData = exports.getProductRandomData = void 0;
const faker_1 = require("@faker-js/faker");
const Product_1 = require("../entities/Product");
const User_1 = require("../entities/User");
const Pet_1 = require("../entities/Pet");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;
const getProductRandomData = async () => {
    const useUnsplash = false; // Change to true to use Unsplash's API
    const categories = Object.values(Product_1.Category);
    const randomIndex = Math.floor(Math.random() * categories.length);
    const category = categories[randomIndex];
    const name = `Producto N°${faker_1.faker.number.int({ min: 1, max: 100 })}`;
    const price = faker_1.faker.number.int({ min: 500, max: 15000 });
    const stock = faker_1.faker.number.int({ min: 0, max: 100 });
    let images = [];
    let description = "";
    try {
        if (useUnsplash) {
            const url = `https://api.unsplash.com/photos/random?query=${category}&client_id=${UNSPLASH_ACCESS_KEY}`;
            const response = await fetch(url);
            const data = await response.json();
            description = data.alt_description || faker_1.faker.commerce.productDescription();
            if (data?.urls.thumb) {
                images.push(data.urls.thumb);
            }
            else {
                throw new Error("Image Url not found.");
            }
        }
    }
    catch (error) {
        console.error("Error getting Unsplash's image: ", error);
    }
    if (images.length === 0) {
        images.push(faker_1.faker.image.url({ width: 200, height: 200 }));
    }
    if (!description) {
        description = faker_1.faker.commerce.productDescription();
    }
    return { category, images, name, description, price, stock };
};
exports.getProductRandomData = getProductRandomData;
const getPetRandomData = async () => {
    const size = faker_1.faker.helpers.arrayElement(Object.values(Pet_1.Size));
    const specie = faker_1.faker.helpers.arrayElement(Object.values(Pet_1.Specie));
    const age = faker_1.faker.helpers.arrayElement(Object.values(Pet_1.Age));
    const sex = faker_1.faker.helpers.arrayElement(Object.values(Pet_1.Sex));
    const status = faker_1.faker.helpers.arrayElement(Object.values(Pet_1.Status));
    const detail = faker_1.faker.lorem.sentences();
    const area = `${faker_1.faker.location.streetAddress()} ${faker_1.faker.location.buildingNumber()}`;
    let img = "";
    try {
        const query = specie === "perro" ? "dog" : "cat";
        const url = `https://api.unsplash.com/photos/random?query=${query}&client_id=${UNSPLASH_ACCESS_KEY}`;
        const response = await fetch(url);
        const data = await response.json();
        img = data.urls.thumb;
    }
    catch (error) {
        img = faker_1.faker.image.url({ width: 200, height: 200 });
    }
    return { size, specie, age, sex, status, detail, area, img };
};
exports.getPetRandomData = getPetRandomData;
const getUserRandomData = async () => {
    const first_name = faker_1.faker.person.firstName();
    const last_name = faker_1.faker.person.lastName();
    const email = faker_1.faker.internet.email({
        firstName: first_name,
        lastName: last_name,
        provider: "gmail.com",
    });
    const password = faker_1.faker.internet.password({ length: 12 });
    const username = faker_1.faker.internet.username({
        firstName: first_name,
        lastName: last_name,
    });
    const phone = `15${faker_1.faker.number.int({
        min: 10000000,
        max: 99999999,
    })}`;
    const role = faker_1.faker.helpers.arrayElement(Object.values(User_1.Role));
    const status = faker_1.faker.helpers.arrayElement(Object.values(User_1.Status));
    return {
        first_name,
        last_name,
        email,
        password,
        username,
        phone,
        role,
        status,
    };
};
exports.getUserRandomData = getUserRandomData;
const getVeterinaryRandomData = async () => {
    const name = faker_1.faker.company.name() + " Clinic";
    const description = faker_1.faker.lorem.sentences();
    const phone = `15${faker_1.faker.number.int({
        min: 10000000,
        max: 99999999,
    })}`;
    const latitude = Number(faker_1.faker.number.float({ min: -35.1, max: -34.9, fractionDigits: 4 }));
    const longitude = Number(faker_1.faker.number.float({ min: -58.5, max: -58.3, fractionDigits: 4 }));
    const location = [latitude, longitude];
    const address = faker_1.faker.location.streetAddress();
    const email = faker_1.faker.internet.email({
        firstName: name,
        provider: "gmail.com",
    });
    let image = "";
    try {
        const url = `https://api.unsplash.com/photos/random?query=veterinary&client_id=${UNSPLASH_ACCESS_KEY}`;
        const response = await fetch(url);
        const data = await response.json();
        image = data.urls.thumb;
    }
    catch (error) {
        image = faker_1.faker.image.url({ width: 200, height: 200 });
    }
    return { image, name, description, phone, location, address, email };
};
exports.getVeterinaryRandomData = getVeterinaryRandomData;
