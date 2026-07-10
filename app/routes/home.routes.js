const express = require("express");
const authCheck = require("../middleware/auth");
const allowRoles = require("../middleware/allowRoles");
const dashboardController = require("../controller/dashboard.controller");
const dashboardRouter = express.Router();

/**
 * @swagger
 * /dashboard/get:
 *   get:
 *     summary: Get Dashboard Statistics
 *     tags:
 *       - Dashboard
 *     security:
 *       - BearerAuth: []
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Dashboard data fetched successfully
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server Error
 */
dashboardRouter.get(
  "/get",
  authCheck,
  allowRoles("superAdmin", "admin", "user"),
  dashboardController.dashboard,
);

module.exports = dashboardRouter;