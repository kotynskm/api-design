import prismaClient from "../db";

// get all updates on products
export const getAllUpdates = async (req, res) => {
  const products = await prismaClient.product.findMany({
    where: {
      belongsToId: req.user.id,
    },
    include: {
      updates: true,
    },
  });
  const updates = products.reduce((allupdates, product) => {
    return [...allupdates, ...product.updates];
  }, []);
  res.json({ data: updates });
};

// get one update
export const getOneUpdate = async (req, res) => {
  const update = await prismaClient.update.findUnique({
    where: {
      id: req.params.id,
    },
  });

  res.json({ data: update });
};

// create an update for a product
export const createUpdate = async (req, res) => {
  const product = await prismaClient.product.findUnique({
    where: {
      id: req.body.id,
    },
  });

  if (!product) {
    res.json({ massage: "Invalid" });
  }

  const update = await prismaClient.update.create({
    data: req.body,
  });

  res.json({ data: update });
};

// update an update
export const updateUpdate = async (req, res) => {
  const products = await prismaClient.product.findMany({
    where: {
      belongsToId: req.user.id,
    },
    include: {
      updates: true,
    },
  });

  const updates = products.reduce((allupdates, product) => {
    return [...allupdates, ...product.updates];
  }, []);

  const match = updates.find((update) => update.id == req.params.id);

  if (!match) {
    return res.json({ message: "Not a match" });
  }

  const updatedUpdate = await prismaClient.update.update({
    where: {
      id: req.params.id,
    },
    data: req.body,
  });
  res.json({ data: updatedUpdate });
};

// delete an update
// update an update
export const deleteUpdate = async (req, res) => {
  const products = await prismaClient.product.findMany({
    where: {
      belongsToId: req.user.id,
    },
    include: {
      updates: true,
    },
  });

  const updates = products.reduce((allupdates, product) => {
    return [...allupdates, ...product.updates];
  }, []);

  const match = updates.find((update) => update.id == req.params.id);

  if (!match) {
    return res.json({ message: "Not a match" });
  }

  const deleted = await prismaClient.update.delete({
    where: {
      id: req.params.id,
    },
  });

  res.json({ data: deleted });
};
