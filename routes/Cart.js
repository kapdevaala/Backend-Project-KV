const express = require("express");
const router = express.Router();

const { addToCart, removeFromCart, getCart } = require("../controller/Cart");
const { auth } = require("../middlewares/Auth");

router.post("/add", auth, addToCart);
router.delete("/remove", auth, removeFromCart);
router.get("/getAll", auth, getCart);

module.exports = router;
