import productModel from "../Models/productModel";

export const getAllProducts = async () => {
  return await productModel.find();
};

export const seedInitialProducts = async () => {
  try {
    const products = [
      {
        title: "Acer Monitor",
        image:
          "https://cypruscomputerglobal.com/Resim/Minik/1500x1500_thumb_st01791_2.jpg",
        price: 3499,
        stock: 50,
      },
    ];

    const existingProduct = await getAllProducts();

    if (existingProduct.length === 0) {
      await productModel.insertMany(products);
    }
  } catch (err) {
    console.log("Cannot see database", err);
  }
};
