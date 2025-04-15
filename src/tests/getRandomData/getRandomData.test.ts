import {
  getPetRandomData,
  getProductRandomData,
  getUserRandomData,
  getVeterinaryRandomData,
} from "./mocks/mockGetRandomData";

test("getPetRandomData should return mocked pet data", async () => {
  const petData = await getPetRandomData();

  expect(petData).toHaveProperty("size", "mediano");
  expect(petData).toHaveProperty("specie", "perro");
  expect(petData).toHaveProperty("age", "joven");
  expect(petData).toHaveProperty("sex", "macho");
  expect(petData).toHaveProperty("status", "adoptado");
  expect(petData).toHaveProperty("detail", "Friendly dog");
  expect(petData).toHaveProperty("area", "Park");
  expect(petData).toHaveProperty("img", "https://fakeimage.com/image.jpg");
});

test("getUserRandomData should return mocked user data", async () => {
  const userData = await getUserRandomData();

  expect(userData).toHaveProperty("first_name", "Test");
  expect(userData).toHaveProperty("last_name", "Test");
  expect(userData).toHaveProperty("email", "testuser@gmail.com");
  expect(userData).toHaveProperty("password", "testPassword00");
  expect(userData).toHaveProperty("username", "test00");
  expect(userData).toHaveProperty("phone", "1100001111");
  expect(userData).toHaveProperty("role", "user");
  expect(userData).toHaveProperty("status", "active");
});

test("getProductRandomData should return mocked product data", async () => {
  const userData = await getProductRandomData();

  expect(userData).toHaveProperty("category", "test-category");
  expect(userData).toHaveProperty("image_url", "https://fakeimage.com/image.jpg");
  expect(userData).toHaveProperty("name", "Test Product");
  expect(userData).toHaveProperty("description", "Test Description");
  expect(userData).toHaveProperty("price", 10);
  expect(userData).toHaveProperty("stock", 10);
});

test("getVeterinaryRandomData should return mocked veterinary data", async () => {
  const veterinaryData = await getVeterinaryRandomData();

  expect(veterinaryData).toHaveProperty(
    "image",
    "https://fakeimage.com/image.jpg"
  );
  expect(veterinaryData).toHaveProperty("name", "Test");
  expect(veterinaryData).toHaveProperty("description", "Test description");
  expect(veterinaryData).toHaveProperty("phone", "1100001111");
  expect(veterinaryData).toHaveProperty("location", "fake location");
  expect(veterinaryData).toHaveProperty("address", "Fake Street");
  expect(veterinaryData).toHaveProperty("email", "fakeemail@gmail.com");
});
