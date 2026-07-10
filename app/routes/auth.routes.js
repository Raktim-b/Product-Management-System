const express = require("express");
const authController = require("../controller/auth.controller");
const router = express.Router();

/**
 * @swagger
 * /auth/create/role:
 *   post:
 *     summary: Create Role
 *     tags:
 *       - Authentication
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: Create Role
 *         description: Create a new role.
 *         schema:
 *           type: object
 *           required:
 *             - role
 *           properties:
 *             role:
 *               type: string
 *               example: admin
 *     responses:
 *       201:
 *         description: Role created successfully
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Server Error
 */
router.post("/create/role", authController.createRole);

/**
 * @swagger
 * /auth/create/super-admin:
 *   post:
 *     summary: Create Super Admin
 *     tags:
 *       - Authentication
 *     produces:
 *       - application/json
 *     description: Creates the default Super Admin using ADMIN_NAME, ADMIN_EMAIL and ADMIN_PASSWORD from the environment variables.
 *     responses:
 *       201:
 *         description: Super Admin created successfully
 *       409:
 *         description: Super Admin already exists
 *       500:
 *         description: Server Error
 */
router.post("/create/super-admin", authController.createSuperAdmin);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login User
 *     tags:
 *       - Authentication
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: Login User
 *         description: Login using email and password.
 *         schema:
 *           type: object
 *           required:
 *             - email
 *             - password
 *           properties:
 *             email:
 *               type: string
 *               example: admin@gmail.com
 *             password:
 *               type: string
 *               example: Admin@123
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Invalid Credentials
 *       500:
 *         description: Server Error
 */
router.post("/login", authController.logIn);

/**
 * @swagger
 * /auth/refresh-token:
 *   post:
 *     summary: Refresh Access Token
 *     tags:
 *       - Authentication
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: Refresh Token
 *         description: Generate a new access token using the refresh token.
 *         schema:
 *           type: object
 *           required:
 *             - refreshToken
 *           properties:
 *             refreshToken:
 *               type: string
 *               example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *     responses:
 *       200:
 *         description: Access token generated successfully
 *       401:
 *         description: Invalid or Expired Refresh Token
 *       500:
 *         description: Server Error
 */
router.post("/refresh-token", authController.refreshToken);

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout User
 *     tags:
 *       - Authentication
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Logout successful
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server Error
 */
router.post("/logout", authController.logOut);

module.exports = router;
