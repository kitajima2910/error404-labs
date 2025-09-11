import express from "express"

import { createProduct, deleteProduct, getProducts, updateProduct } from "../controllers/product.controller.js"

const router = express.Router()

router.post("/", createProduct);
router.delete("/:id", deleteProduct);
router.get("/", getProducts);
router.patch("/:id", updateProduct);

export default router