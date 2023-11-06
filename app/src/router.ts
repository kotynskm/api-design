import { Router } from "express";
import { body, oneOf, validationResult } from "express-validator";
import { handleInputErrors } from "./utils/middleware";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getOneProduct,
  updateProduct,
} from "./handlers/product";
import {
  createUpdate,
  deleteUpdate,
  getAllUpdates,
  getOneUpdate,
  updateUpdate,
} from "./handlers/update";

const router = Router();

// product routes
router.get("/product", getAllProducts);

router.get("/product/:id", getOneProduct);

router.post(
  "/product",
  body("name").isString(),
  handleInputErrors,
  createProduct
);

router.put(
  "/product/:id",
  body("name").isString(),
  handleInputErrors,
  updateProduct
);

router.delete("/product/:id", deleteProduct);

// update routes
router.get("/update", getAllUpdates);

router.get("/update/:id", getOneUpdate);

router.post(
  "/update",
  body("title").exists().isString(),
  body("body").exists().isString(),
  createUpdate
);

router.put(
  "/update/:id",
  body("title").optional(),
  body("body").optional(),
  body("status").isIn(["IN_PROGRESS", "SHIPPED", "DEPRECATED"]),
  body("version").optional(),
  updateUpdate
);

router.delete("/update/:id", deleteUpdate);

// update point routes
router.get("/updatepoint", (req, res) => {
  res.json({ message: "product" });
});

router.get("/updatepoint/:id", (req, res) => {});

router.post(
  "/updatepoint",
  body("name").exists().isString(),
  body("description").exists().isString(),
  body("updateId").exists().isString(),
  (req, res) => {}
);

router.put(
  "/updatepoint/:id",
  body("name").optional().isString(),
  body("description").optional().isString(),
  (req, res) => {}
);

router.delete("/updatepoint/:id", (req, res) => {});

export default router;
