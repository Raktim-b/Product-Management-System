const express = require("express");
const authCheck = require("../middleware/auth");
const allowRoles = require("../middleware/allowRoles");
const userController = require("../controller/user.Controller");
const UserImage = require("../middleware/fileUploades");
const router = express.Router();

/**
 * @swagger
 * /user/create/admin:
 *   post:
 *     summary: Create Admin
 *     tags:
 *       - User
 *     security:
 *       - BearerAuth: []
 *     consumes:
 *       - multipart/form-data
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: formData
 *         name: name
 *         type: string
 *         required: true
 *       - in: formData
 *         name: email
 *         type: string
 *         required: true
 *       - in: formData
 *         name: password
 *         type: string
 *         required: true
 *       - in: formData
 *         name: phone
 *         type: string
 *         required: true
 *       - in: formData
 *         name: avatar
 *         type: file
 *         required: false
 *         description: Admin Profile Image
 *     responses:
 *       201:
 *         description: Admin created successfully
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server Error
 */
router.post(
  "/create/admin",
  authCheck,
  allowRoles("superAdmin"),
  UserImage.single("avatar"),
  userController.createAdmin,
);

/**
 * @swagger
 * /user/create/user:
 *   post:
 *     summary: Create User
 *     tags:
 *       - User
 *     security:
 *       - BearerAuth: []
 *     consumes:
 *       - multipart/form-data
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: formData
 *         name: name
 *         type: string
 *         required: true
 *       - in: formData
 *         name: email
 *         type: string
 *         required: true
 *       - in: formData
 *         name: password
 *         type: string
 *         required: true
 *       - in: formData
 *         name: phone
 *         type: string
 *         required: true
 *       - in: formData
 *         name: avatar
 *         type: file
 *         required: false
 *         description: User Profile Image
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server Error
 */
router.post(
  "/create/user",
  authCheck,
  allowRoles("superAdmin", "admin"),
  UserImage.single("avatar"),
  userController.createUser,
);

/**
 * @swagger
 * /user/get/user:
 *   get:
 *     summary: Get All Users
 *     tags:
 *       - User
 *     security:
 *       - BearerAuth: []
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Users fetched successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server Error
 */
router.get(
  "/get/user",
  authCheck,
  allowRoles("superAdmin", "admin"),
  userController.getUser,
);

/**
 * @swagger
 * /user/update/{id}:
 *   put:
 *     summary: Update User
 *     tags:
 *       - User
 *     security:
 *       - BearerAuth: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: User ID
 *       - in: body
 *         name: Update User
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             phone:
 *               type: string
 *             status:
 *               type: boolean
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Bad Request
 *       404:
 *         description: User not found
 *       500:
 *         description: Server Error
 */
router.put(
  "/update/:id",
  authCheck,
  allowRoles("superAdmin", "admin"),
  userController.updateUser,
);

/**
 * @swagger
 * /user/toggle/{id}:
 *   patch:
 *     summary: Toggle User Status
 *     tags:
 *       - User
 *     security:
 *       - BearerAuth: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User status updated successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Server Error
 */
router.patch(
  "/toggle/:id",
  authCheck,
  allowRoles("superAdmin", "admin"),
  userController.toggleUserStatus,
);

/**
 * @swagger
 * /user/delete/{id}:
 *   delete:
 *     summary: Soft Delete User
 *     tags:
 *       - User
 *     security:
 *       - BearerAuth: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Server Error
 */
router.delete(
  "/delete/:id",
  authCheck,
  allowRoles("superAdmin", "admin"),
  userController.softDelete,
);

/**
 * @swagger
 * /user/recover/{id}:
 *   patch:
 *     summary: Recover Deleted User
 *     tags:
 *       - User
 *     security:
 *       - BearerAuth: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: User ID
 *     responses:
 *       200:
 *         description: User recovered successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Server Error
 */
router.patch(
  "/recover/:id",
  authCheck,
  allowRoles("superAdmin", "admin"),
  userController.recover,
);

/**
 * @swagger
 * /user/change-password:
 *   put:
 *     summary: Change Password
 *     tags:
 *       - User
 *     security:
 *       - BearerAuth: []
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: Change Password
 *         schema:
 *           type: object
 *           required:
 *             - oldPassword
 *             - newPassword
 *           properties:
 *             oldPassword:
 *               type: string
 *             newPassword:
 *               type: string
 *     responses:
 *       200:
 *         description: Password changed successfully
 *       400:
 *         description: Invalid Password
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server Error
 */
router.put("/change-password", authCheck, userController.changePassword);

module.exports = router;
