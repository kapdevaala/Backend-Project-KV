const express = require("express");
const router = express.Router();

const {
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getProduct,
} = require("../controller/Product");
const { auth, isAdmin } = require("../middlewares/Auth");

router.post("/create", auth, isAdmin, createProduct);
router.put("/update/:id", auth, isAdmin, updateProduct);
router.delete("/delete/:id", auth, isAdmin, deleteProduct);
router.get("/all", getAllProducts);
router.get("/:id", auth, getProduct);

module.exports = router;
