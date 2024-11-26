const express = require("express");
const fileUpload = require("express-fileupload");
const app = express();
const database = require("./config/database");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const userRoutes = require("./routes/User");
const productRoutes = require("./routes/Product");
const orderRoutes = require("./routes/Order");
const cartRoutes = require("./routes/Cart");
const { cloudnairyconnect } = require("./config/cloudinary");
cloudnairyconnect();
app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);
app.use(cors());

app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/cart", cartRoutes);
app.use("/api/v1/order", orderRoutes);
app.use("/api/v1/product", productRoutes);

const PORT = process.env.PORT || 4000;
database.connect();

app.get("/", (req, res) => {
  return res.status(200).json({
    message: "Welcome to the Our Server Side",
  });
});

app.post("/api/v1/test", async (req, res) => {
  try {
    const { image } = req.body;
    console.log("image", image);
    if (!image) {
      return res.status(400).json({
        message: "Image not found",
      });
    }
    console.log("imageUrl", imageUrl);
    return res.status(200).json({
      message: "Image uploaded successfully",
      imageUrl,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      message: "Cannot upload image",
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
