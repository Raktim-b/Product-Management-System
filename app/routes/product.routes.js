const express = require("express");
const authCheck = require("../middleware/auth");
const allowRoles = require("../middleware/allowRoles");
const productController = require("../controller/product.controller");
const productRouter = express.Router();

/**
 * @swagger
 * /product/create:
 *   post:
 *     summary: Create Product
 *     tags:
 *       - Product
 *     security:
 *       - BearerAuth: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: Create Product
 *         description: Create a new product.
 *         schema:
 *           type: object
 *           required:
 *             - productName
 *             - categoryId
 *             - subCategoryId
 *             - price
 *           properties:
 *             productName:
 *               type: string
 *               example: iPhone 16 Pro
 *             categoryId:
 *               type: string
 *               example: 6a50ba220eb173184e8d4647
 *             subCategoryId:
 *               type: string
 *               example: 6a50bff45c95f88b4ed7a9a6
 *             price:
 *               type: number
 *               example: 129999
 *             description:
 *               type: string
 *               example: Apple flagship smartphone with A18 Pro chip.
 *             stock:
 *               type: number
 *               example: 25
 *     responses:
 *       201:
 *         description: Product created successfully
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server Error
 */
productRouter.post(
  "/create",
  authCheck,
  allowRoles("superAdmin", "admin", "user"),
  productController.createProduct,
);

/**
 * @swagger
 * /product/get:
 *   get:
 *     summary: Get All Products
 *     tags:
 *       - Product
 *     security:
 *       - BearerAuth: []
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Products fetched successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server Error
 */
productRouter.get(
  "/get",
  authCheck,
  allowRoles("superAdmin", "admin", "user"),
  productController.getProducts,
);

/**
 * @swagger
 * /product/get/{id}:
 *   get:
 *     summary: Get Product By ID
 *     tags:
 *       - Product
 *     security:
 *       - BearerAuth: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product fetched successfully
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server Error
 */
productRouter.get(
  "/get/:id",
  authCheck,
  allowRoles("superAdmin", "admin", "user"),
  productController.getProductById,
);

/**
 * @swagger
 * /product/update/{id}:
 *   put:
 *     summary: Update Product
 *     tags:
 *       - Product
 *     security:
 *       - BearerAuth: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: Product ID
 *       - in: body
 *         name: Update Product
 *         description: Update product details.
 *         schema:
 *           type: object
 *           properties:
 *             productName:
 *               type: string
 *               example: Samsung Galaxy S25 Ultra
 *             categoryId:
 *               type: string
 *               example: 6a50ba220eb173184e8d4647
 *             subCategoryId:
 *               type: string
 *               example: 6a50bff45c95f88b4ed7a9a6
 *             price:
 *               type: number
 *               example: 139999
 *             description:
 *               type: string
 *               example: Samsung flagship smartphone.
 *             stock:
 *               type: number
 *               example: 30
 *     responses:
 *       200:
 *         description: Product updated successfully
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server Error
 */
productRouter.put(
  "/update/:id",
  authCheck,
  allowRoles("superAdmin", "admin", "user"),
  productController.updateProduct,
);

/**
 * @swagger
 * /product/delete/{id}:
 *   delete:
 *     summary: Delete Product
 *     tags:
 *       - Product
 *     security:
 *       - BearerAuth: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 *       500:
 *         description: Server Error
 */
productRouter.delete(
  "/delete/:id",
  authCheck,
  allowRoles("superAdmin", "admin", "user"),
  productController.deleteProduct,
);

module.exports = productRouter;
