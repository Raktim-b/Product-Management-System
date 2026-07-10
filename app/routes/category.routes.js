const express = require("express");
const categoryController = require("../controller/category.controller");
const authCheck = require("../middleware/auth");
const allowRoles = require("../middleware/allowRoles");
const categoryRouter = express.Router();

/**
 * @swagger
 * /category/create:
 *   post:
 *     summary: Create Category
 *     tags:
 *       - Category
 *     security:
 *       - BearerAuth: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: Create Category
 *         description: Create a new product category.
 *         schema:
 *           type: object
 *           required:
 *             - categoryName
 *           properties:
 *             categoryName:
 *               type: string
 *               example: Electronics
 *     responses:
 *       201:
 *         description: Category created successfully
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server Error
 */
categoryRouter.post(
  "/create",
  authCheck,
  allowRoles("superAdmin", "admin", "user"),
  categoryController.createCategory,
);

/**
 * @swagger
 * /category/get:
 *   get:
 *     summary: Get All Categories
 *     tags:
 *       - Category
 *     security:
 *       - BearerAuth: []
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Categories fetched successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server Error
 */
categoryRouter.get(
  "/get",
  authCheck,
  allowRoles("superAdmin", "admin", "user"),
  categoryController.getCategories,
);

/**
 * @swagger
 * /category/get/{id}:
 *   get:
 *     summary: Get Category By ID
 *     tags:
 *       - Category
 *     security:
 *       - BearerAuth: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: Category ID
 *     responses:
 *       200:
 *         description: Category fetched successfully
 *       404:
 *         description: Category not found
 *       500:
 *         description: Server Error
 */
categoryRouter.get(
  "/get/:id",
  authCheck,
  allowRoles("superAdmin", "admin", "user"),
  categoryController.getCategoryById,
);

/**
 * @swagger
 * /category/update/{id}:
 *   put:
 *     summary: Update Category
 *     tags:
 *       - Category
 *     security:
 *       - BearerAuth: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: Category ID
 *       - in: body
 *         name: Update Category
 *         description: Update category details.
 *         schema:
 *           type: object
 *           properties:
 *             categoryName:
 *               type: string
 *               example: Electronics
 *     responses:
 *       200:
 *         description: Category updated successfully
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Category not found
 *       500:
 *         description: Server Error
 */
categoryRouter.put(
  "/update/:id",
  authCheck,
  allowRoles("superAdmin", "admin", "user"),
  categoryController.updateCategory,
);

/**
 * @swagger
 * /category/delete/{id}:
 *   delete:
 *     summary: Delete Category
 *     tags:
 *       - Category
 *     security:
 *       - BearerAuth: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: Category ID
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *       404:
 *         description: Category not found
 *       500:
 *         description: Server Error
 */
categoryRouter.delete(
  "/delete/:id",
  authCheck,
 allowRoles("superAdmin", "admin", "user"),
  categoryController.deleteCategory,
);

module.exports = categoryRouter;