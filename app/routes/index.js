const express = require("express");
const authRoutes = require("./auth.routes");
const userRouter = require("./user.routes");
const categoryRouter = require("./category.routes");
const subCategoryRouter = require("./subCategory.routes");
const productRouter = require("./product.routes");
const dashboardRouter = require("./home.routes");
const router = express.Router();

router.use("/auth", authRoutes);
router.use("/user", userRouter);
router.use("/category", categoryRouter);
router.use("/subCategory", subCategoryRouter);
router.use("/product", productRouter);
router.use("/dashboard", dashboardRouter);

module.exports = router;
