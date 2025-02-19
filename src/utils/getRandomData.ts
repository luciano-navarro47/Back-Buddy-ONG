import * as dotenv from "dotenv";
dotenv.config();

const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

export const getCategoryRandomData = async (
  category: string
): Promise<{ description: string; image: string }> => {
  const query =
    category === "otros"
      ? "cat toys"
      : category === "idumentaria"
      ? "dress"
      : category === "tazas"
      ? "cup"
      : "food";

  const url = `https://api.unsplash.com/photos/random?query=${query}&client_id=${UNSPLASH_ACCESS_KEY}`;

  const response = await fetch(url);
  const data = await response.json();

  const description = data.alt_description;
  const image = data.urls.thumb;
  return { description, image };
};

export const getPetRandomData = async (
  specie: string
): Promise<{ description: string; image: string }> => {
  const query = specie === "perro" ? "dog" : "cat";

  const url = `https://api.unsplash.com/photos/random?query=${query}&client_id=${UNSPLASH_ACCESS_KEY}`;
  const response = await fetch(url);
  const data = await response.json();

  const image = data.urls.thumb;
  return image;
};
