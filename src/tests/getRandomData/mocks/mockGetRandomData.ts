let img = "https://fakeimage.com/image.jpg"

export const getPetRandomData = jest.fn(() =>
      Promise.resolve({
        size: "mediano",
        specie: "perro",
        age: "joven",
        sex: "macho",
        status: "adoptado",
        detail: "Friendly dog",
        area: "Park",
        img
      })
    );
  
export const getUserRandomData = jest.fn(() => 
      Promise.resolve({
        first_name: "Test",
        last_name: "Test",
        email: "testuser@gmail.com",
        password: "testPassword00",
        username: "test00",
        phone: "1100001111",
        role: "user",
        status: "active",
      })
    );
  
export const getProductRandomData = jest.fn(()=> 
      Promise.resolve({
        category: "test-category",
        image_url: img,
        name: "Test Product",
        description: "Test Description",
        price: 10,
        stock: 10
      })
    )

export const getVeterinaryRandomData = jest.fn(()=> 
  Promise.resolve({
    image: img,
    name: "Test",
    description: "Test description",
    phone: "1100001111",
    location: "fake location",
    address: "Fake Street",
    email: "fakeemail@gmail.com",
  })
);