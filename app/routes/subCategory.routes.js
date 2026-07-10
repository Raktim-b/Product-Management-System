const express = require("express");
const authCheck = require("../middleware/auth");
const allowRoles = require("../middleware/allowRoles");
const subCategoryController = require("../controller/subCategory.controller");
const subCategoryRouter = express.Router();

/**
 * @swagger
 * /subcategory/create:
 *   post:
 *     summary: Create Subcategory
 *     tags:
 *       - Subcategory
 *     security:
 *       - BearerAuth: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: Create Subcategory
 *         description: Create a new subcategory.
 *         schema:
 *           type: object
 *           required:
 *             - subCategoryName
 *             - categoryId
 *           properties:
 *             subCategoryName:
 *               type: string
 *               example: Laptop
 *             categoryId:
 *               type: string
 *               example: 6a50ba220eb173184e8d4647
 *     responses:
 *       201:
 *         description: Subcategory created successfully
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server Error
 */
subCategoryRouter.post(
  "/create",
  authCheck,
  allowRoles("superAdmin", "admin", "user"),
  subCategoryController.createSubCategory,
);

/**
 * @swagger
 * /subcategory/get:
 *   get:
 *     summary: Get All Subcategories
 *     tags:
 *       - Subcategory
 *     security:
 *       - BearerAuth: []
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Subcategories fetched successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server Error
 */
subCategoryRouter.get(
  "/get",
  authCheck,
  allowRoles("superAdmin", "admin", "user"),
  subCategoryController.getSubCategories,
);

/**
 * @swagger
 * /subcategory/get/{id}:
 *   get:
 *     summary: Get Subcategory By ID
 *     tags:
 *       - Subcategory
 *     security:
 *       - BearerAuth: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: Subcategory ID
 *     responses:
 *       200:
 *         description: Subcategory fetched successfully
 *       404:
 *         description: Subcategory not found
 *       500:
 *         description: Server Error
 */
subCategoryRouter.get(
  "/get/:id",
  authCheck,
  allowRoles("superAdmin", "admin", "user"),
  subCategoryController.getSubCategoryById,
);

/**
 * @swagger
 * /subcategory/update/{id}:
 *   put:
 *     summary: Update Subcategory
 *     tags:
 *       - Subcategory
 *     security:
 *       - BearerAuth: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: Subcategory ID
 *       - in: body
 *         name: Update Subcategory
 *         description: Update subcategory details.
 *         schema:
 *           type: object
 *           properties:
 *             subCategoryName:
 *               type: string
 *               example: Gaming Laptop
 *             categoryId:
 *               type: string
 *               example: 6a50ba220eb173184e8d4647
 *     responses:
 *       200:
 *         description: Subcategory updated successfully
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Subcategory not found
 *       500:
 *         description: Server Error
 */
subCategoryRouter.put(
  "/update/:id",
  authCheck,
  allowRoles("superAdmin", "admin", "user"),
  subCategoryController.updateSubCategory,
);

/**
 * @swagger
 * /subcategory/delete/{id}:
 *   delete:
 *     summary: Delete Subcategory
 *     tags:
 *       - Subcategory
 *     security:
 *       - BearerAuth: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: Subcategory ID
 *     responses:
 *       200:
 *         description: Subcategory deleted successfully
 *       404:
 *         description: Subcategory not found
 *       500:
 *         description: Server Error
 */
subCategoryRouter.delete(
  "/delete/:id",
  authCheck,
  allowRoles("superAdmin", "admin", "user"),
  subCategoryController.deleteSubCategory,
);

module.exports = subCategoryRouter;
