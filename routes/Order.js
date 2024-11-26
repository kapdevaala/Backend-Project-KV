const express = require("express");
const router = express.Router();

const { createOrder, getOrder, updateOrder } = require("../controller/Orders");
const { auth } = require("../middlewares/Auth");

router.post("/create", auth, createOrder);
router.get("/get", auth, getOrder);
router.put("/update/:id", auth, updateOrder);

module.exports = router;
