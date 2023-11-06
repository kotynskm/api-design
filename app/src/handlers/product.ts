import prismaClient from "../db";

// get all products on a user
export const getAllProducts = async (req, res) => {
  // query DB for the user
  const user = await prismaClient.user.findUnique({
    where: {
      id: req.user.id,
    },
    include: {
      // make sure the products are there
      products: true,
    },
  });

  // easiest to send it back on a data object for interaction with the frontend UI, can send other things back like errors as well
  res.json({ data: user.products, errors: [] });
};

// get one product
export const getOneProduct = async (req, res) => {
  // use ID from the query param
  const id = req.params.id;
  // query product table to find product
  const product = await prismaClient.product.findFirst({
    where: {
      id: id,
      belongsToId: req.user.id,
    },
  });
  res.json({ data: product });
};

// create a product
export const createProduct = async (req, res) => {
  const product = await prismaClient.product.create({
    data: {
      name: req.body.name,
      belongsToId: req.user.id,
    },
  });
  res.json({ data: product });
};

// delete a product
export const deleteProduct = async (req, res) => {
  const deleted = await prismaClient.product.delete({
    where: {
      id_belongsToId: {
        id: req.params.id,
        belongsToId: req.user.id,
      },
    },
  });
  res.json({ data: deleted });
};

// update a product
export const updateProduct = async (req, res) => {
  const updated = await prismaClient.product.update({
    where: {
      id_belongsToId: {
        id: req.params.id,
        belongsToId: req.user.id,
      },
    },
    data: {
      name: req.body.name,
    },
  });
  res.json({ data: updated });
};
