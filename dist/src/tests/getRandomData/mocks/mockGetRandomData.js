"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVeterinaryRandomData = exports.getProductRandomData = exports.getUserRandomData = exports.getPetRandomData = void 0;
let img = "https://fakeimage.com/image.jpg";
exports.getPetRandomData = jest.fn(() => Promise.resolve({
    size: "mediano",
    specie: "perro",
    age: "joven",
    sex: "macho",
    status: "adoptado",
    detail: "Friendly dog",
    area: "Park",
    img
}));
exports.getUserRandomData = jest.fn(() => Promise.resolve({
    name: "Test",
    surname: "Test",
    email: "testuser@gmail.com",
    password: "testPassword00",
    username: "test00",
    phone: "1100001111",
    role: "user",
    status: "active",
}));
exports.getProductRandomData = jest.fn(() => Promise.resolve({
    category: "test-category",
    image: img,
    name: "Test Product",
    description: "Test Description",
    price: 10,
    stock: 10
}));
exports.getVeterinaryRandomData = jest.fn(() => Promise.resolve({
    image: img,
    name: "Test",
    description: "Test description",
    phone: "1100001111",
    location: "fake location",
    address: "Fake Street",
    email: "fakeemail@gmail.com",
}));
