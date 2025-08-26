import { faker } from "@faker-js/faker";

import { Category } from "../entities/Product";
import { Role, Status as UserStatus } from "../entities/User";
import { Size, Specie, Sex, Age, Status as PetStatus } from "../entities/Pet";
import * as dotenv from "dotenv";
dotenv.config();

const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

export const getProductRandomData = async (): Promise<{
  category: string;
  images: string[];
  name: string;
  description: string;
  price: number;
  stock: number;
}> => {
  const useUnsplash = false; // Change to true to use Unsplash's API
  const categories = Object.values(Category);
  const randomIndex = Math.floor(Math.random() * categories.length);
  const category = categories[randomIndex] as Category;

  const name = `Producto N°${faker.number.int({ min: 1, max: 100 })}`;
  const price = faker.number.int({ min: 500, max: 15000 });
  const stock = faker.number.int({ min: 0, max: 100 });
  let images: string[] = [];
  let description = "";

  try {
    if (useUnsplash) {
      const url = `https://api.unsplash.com/photos/random?query=${category}&client_id=${UNSPLASH_ACCESS_KEY}`;
      const response = await fetch(url);
      const data = await response.json();
      
      description = data.alt_description || faker.commerce.productDescription();
      if (data?.urls.thumb) {
        images.push(data.urls.thumb);
      } else {
        throw new Error("Image Url not found.");
      }
    }
  } catch (error) {
    console.error("Error getting Unsplash's image: ", error);
  }

  if (images.length === 0) {
    images.push(faker.image.url({ width: 200, height: 200 }));
  }
  if (!description) {
    description = faker.commerce.productDescription();
  }

  return { category, images, name, description, price, stock };
};

export const getPetRandomData = async (): Promise<{
  size: string;
  specie: string;
  age: string;
  sex: string;
  status: string;
  detail: string;
  area: string;
  img: string;
}> => {
  const size = faker.helpers.arrayElement(Object.values(Size));
  const specie = faker.helpers.arrayElement(Object.values(Specie));
  const age = faker.helpers.arrayElement(Object.values(Age));
  const sex = faker.helpers.arrayElement(Object.values(Sex));
  const status = faker.helpers.arrayElement(Object.values(PetStatus));
  const detail = faker.lorem.sentences();
  const area = `${faker.location.streetAddress()} ${faker.location.buildingNumber()}`;

  let img = "";
  try {
    const query = specie === "perro" ? "dog" : "cat";
    const url = `https://api.unsplash.com/photos/random?query=${query}&client_id=${UNSPLASH_ACCESS_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    img = data.urls.thumb;
  } catch (error) {
    img = faker.image.url({ width: 200, height: 200 });
  }

  return { size, specie, age, sex, status, detail, area, img };
};

export const getUserRandomData = async (): Promise<{
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  username: string;
  phone: string;
  role: Role;
  status: UserStatus;
}> => {
  const first_name = faker.person.firstName();
  const last_name = faker.person.lastName();
  const email = faker.internet.email({
    firstName: first_name,
    lastName: last_name,
    provider: "gmail.com",
  });
  const password = faker.internet.password({ length: 12 });
  const username = faker.internet.username({
    firstName: first_name,
    lastName: last_name,
  });
  const phone = `15${faker.number.int({
    min: 10000000,
    max: 99999999,
  })}`;
  const role = faker.helpers.arrayElement(Object.values(Role));
  const status = faker.helpers.arrayElement(Object.values(UserStatus));

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

export const getVeterinaryRandomData = async (): Promise<{
  image: string;
  name: string;
  description: string;
  phone: string;
  location: number[];
  address: string;
  email: string;
}> => {
  const name = faker.company.name() + " Clinic";
  const description = faker.lorem.sentences();
  const phone = `15${faker.number.int({
    min: 10000000,
    max: 99999999,
  })}`;
  const latitude = Number(
    faker.number.float({ min: -35.1, max: -34.9, fractionDigits: 4 })
  );
  const longitude = Number(
    faker.number.float({ min: -58.5, max: -58.3, fractionDigits: 4 })
  );
  const location = [latitude, longitude];
  const address = faker.location.streetAddress();
  const email = faker.internet.email({
    firstName: name,
    provider: "gmail.com",
  });
  let image = "";

  try {
    const url = `https://api.unsplash.com/photos/random?query=veterinary&client_id=${UNSPLASH_ACCESS_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    image = data.urls.thumb;
  } catch (error) {
    image = faker.image.url({ width: 200, height: 200 });
  }

  return { image, name, description, phone, location, address, email };
};
