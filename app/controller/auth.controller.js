const roleModel = require("../model/roleModel");
const UserModel = require("../model/userModel");
const httpStatusCode = require("../utils/httpStatusCode");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const logger = require("../utils/logger");
class AuthController {
  async createRole(req, res) {
    try {
      const { role } = req.body;
      logger.debug("Create role request received: %s", role);
      const existingRole = await roleModel.findOne({ role });

      if (existingRole) {
        logger.warn("Role already exists: %s", role);
        return res.status(httpStatusCode.BAD_REQUEST).json({
          success: false,
          message: "Role already exists",
        });
      }

      const data = new roleModel({
        role,
      });

      const result = await data.save();
      logger.info("Role created successfully: %s", role);
      return res.status(httpStatusCode.CREATED).json({
        success: true,
        message: "Role created successfully",
        data: result,
      });
    } catch (error) {
      logger.error("Error creating role: %s", error.stack);
      return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }
  async createSuperAdmin(req, res) {
    try {
      const userRole = await roleModel.findOne({
        role: "superAdmin",
      });
      if (!userRole) {
        return res.status(httpStatusCode.NOT_FOUND).json({
          success: false,
          message: "Role role not found",
        });
      }

      const existingAdmin = await UserModel.findOne({
        email: process.env.ADMIN_EMAIL,
      });
      if (existingAdmin) {
        return res.status(httpStatusCode.BAD_REQUEST).json({
          success: false,
          message: "Admin already exist",
        });
      }

      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD, salt);
      const userData = await UserModel.create({
        name: process.env.ADMIN_NAME,
        email: process.env.ADMIN_EMAIL,
        password: hashPassword,
        roleId: userRole._id,
        isVerified: true,
      });

      return res.status(httpStatusCode.CREATED).json({
        success: true,
        message: "User Added successfully",
        data: userData,
      });
    } catch (error) {
      return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }
  async logIn(req, res) {
    try {
      const { email, password } = req.body;

      const userData = await UserModel.aggregate([
        {
          $match: {
            email: email,
            isDeleted: false,
          },
        },
        {
          $lookup: {
            from: "roles",
            localField: "roleId",
            foreignField: "_id",
            as: "role",
          },
        },
        {
          $unwind: "$role",
        },
      ]);
      if (!userData) {
        return res.status(httpStatusCode.NOT_FOUND).json({
          success: false,
          message: "User not found",
        });
      }
      const user = userData[0];
      const checkPassword = await bcrypt.compare(password, user.password);
      if (!checkPassword) {
        return res.status(httpStatusCode.BAD_REQUEST).json({
          status: false,
          message: "Wrong password",
        });
      }
      const accesstoken = jwt.sign(
        {
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role.role,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" },
      );
      const refreshToken = jwt.sign(
        {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role.role,
        },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: "7d" },
      );
      await UserModel.findByIdAndUpdate(user._id, {
        refreshToken,
      });
      return res.status(httpStatusCode.OK).json({
        success: true,
        message: "User Logedin Successfully",
        data: {
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          role: user.role.role,
        },
        accesstoken: accesstoken,
        refreshToken: refreshToken,
      });
    } catch (error) {
      return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }
  async refreshToken(req, res) {
    try {
      const refreshToken = req.headers["refresh-token"];
      if (!refreshToken) {
        return res.status(httpStatusCode.UNAUTHORIZED).json({
          success: false,
          message: "Refresh token missing",
        });
      }
      const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
      const user = await UserModel.findById(decoded.id);
      if (!user) {
        return res.status(httpStatusCode.UNAUTHORIZED).json({
          success: false,
          message: "User not found",
        });
      }
      if (user.refreshToken !== refreshToken) {
        return res.status(httpStatusCode.UNAUTHORIZED).json({
          success: false,
          message: "Invalid refresh token",
        });
      }
      const newAccessToken = jwt.sign(
        {
          id: decoded.id,
          name: decoded.name,
          email: decoded.email,
          role: decoded.role,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "5m",
        },
      );
      return res.status(httpStatusCode.OK).json({
        success: true,
        data: {
          name: user.name,
          email: user.email,
          newAccessToken: newAccessToken,
        },
      });
    } catch (error) {
      return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }
  async logOut(req, res) {
    try {
      return res.status(httpStatusCode.OK).json({
        success: true,
        message: "Logged out successfully",
      });
    } catch (error) {
      return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }
}
module.exports = new AuthController();
