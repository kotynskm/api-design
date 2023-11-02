import { Router } from "express";

const router = Router();

// product routes
router.get("/product", (req, res) => {
  res.json({ message: "product" });
});

router.get("/product/:id", (req, res) => {});

router.post("/product", (req, res) => {});

router.put("/product", (req, res) => {});

router.delete("/product/:id", (req, res) => {});

// update routes
router.get("/update", (req, res) => {
  res.json({ message: "product" });
});

router.get("/update/:id", (req, res) => {});

router.post("/update", (req, res) => {});

router.put("/update", (req, res) => {});

router.delete("/update/:id", (req, res) => {});

// update point routes
router.get("/updatepoint", (req, res) => {
  res.json({ message: "product" });
});

router.get("/updatepoint/:id", (req, res) => {});

router.post("/updatepoint", (req, res) => {});

router.put("/updatepoint", (req, res) => {});

router.delete("/updatepoint/:id", (req, res) => {});
