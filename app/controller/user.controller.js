const UserModel = require("../model/userModel");
const httpStatusCode = require("../utils/httpStatusCode");
const bcrypt = require("bcrypt");
const cloudinary = require("../config/cloudinary");
const sendEmail = require("../utils/sendEmail");
const roleModel = require("../model/roleModel");
const registerValidation = require("../validation/authValidation");
const logger = require("../utils/logger");

class UserController {
  //  CREATE ADMIN

  async createAdmin(req, res) {
    try {
      const { error } = registerValidation.validate(req.body);

      if (error) {
        logger.warn("Validation failed: %s", error.details[0].message);

        return res.status(httpStatusCode.BAD_REQUEST).json({
          success: false,
          message: error.details[0].message,
        });
      }
      const { name, email, password, phone } = req.body;
      if (!name || !email || !password) {
        return res.status(httpStatusCode.BAD_REQUEST).json({
          success: false,
          message: "All fields are required",
        });
      }

      const existingUser = await UserModel.findOne({
        email,
      });
      if (existingUser) {
        return res.status(httpStatusCode.BAD_REQUEST).json({
          success: false,
          message: "User already exists",
        });
      }
      const roleData = await roleModel.findOne({ role: "admin" });

      if (!roleData) {
        return res.status(httpStatusCode.BAD_REQUEST).json({
          success: false,
          message: "Role not found",
        });
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const userData = new UserModel({
        name,
        email,
        password: hashedPassword,
        roleId: roleData._id,
        phone,
      });
      if (req.file) {
        userData.avatar = req.file.path;
        userData.public_id = req.file.filename;
      }
      const result = await userData.save();
      await sendEmail(result, password);
      const user = await UserModel.aggregate([
        {
          $match: {
            email: result.email,
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
        // {
        //   $project: {
        //     _id: 1,
        //     name: 1,
        //     email: 1,
        //     role: "$role.role",
        //   },
        // },
      ]);
      return res.status(httpStatusCode.CREATED).json({
        success: true,
        message: "Registered Successfully",
        data: user[0],
      });
    } catch (error) {
      return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }

  //  CREATE USER

  async createUser(req, res) {
    try {
      const { error } = registerValidation.validate(req.body);

      if (error) {
        logger.warn("Validation failed: %s", error.details[0].message);

        return res.status(httpStatusCode.BAD_REQUEST).json({
          success: false,
          message: error.details[0].message,
        });
      }
      const { name, email, password, phone } = req.body;
      if (!name || !email || !password) {
        return res.status(httpStatusCode.BAD_REQUEST).json({
          success: false,
          message: "All fields are required",
        });
      }

      const existingUser = await UserModel.findOne({
        email,
      });
      if (existingUser) {
        return res.status(httpStatusCode.BAD_REQUEST).json({
          success: false,
          message: "User already exists",
        });
      }
      const roleData = await roleModel.findOne({ role: "user" });

      if (!roleData) {
        return res.status(httpStatusCode.BAD_REQUEST).json({
          success: false,
          message: "Role not found",
        });
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const userData = new UserModel({
        name,
        email,
        password: hashedPassword,
        roleId: roleData._id,
        phone,
      });
      if (req.file) {
        userData.avatar = req.file.path;
        userData.public_id = req.file.filename;
      }
      const result = await userData.save();
      await sendEmail(result, password);
      const user = await UserModel.aggregate([
        {
          $match: {
            email: result.email,
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
        // {
        //   $project: {
        //     _id: 1,
        //     name: 1,
        //     email: 1,
        //     role: "$role.role",
        //   },
        // },
      ]);
      return res.status(httpStatusCode.CREATED).json({
        success: true,
        message: "Registered Successfully",
        data: user[0],
      });
    } catch (error) {
      return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }

  //  GET USER

  async getUser(req, res) {
    try {
      const users = await UserModel.find({
        isDeleted: false,
      });
      return res.status(httpStatusCode.OK).json({
        success: true,
        message: "Users fetched successfully",
        data: users,
      });
    } catch (error) {
      return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }

  //  UPDATE USER

  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const existUser = await UserModel.findById(id);
      if (!existUser) {
        return res.status(httpStatusCode.NOT_FOUND).json({
          success: false,
          message: "User not found",
        });
      }
      const roleData = await roleModel.findById(existUser.roleId);

      if (req.user.role === "admin" && roleData.role !== "user") {
        return res.status(httpStatusCode.FORBIDDEN).json({
          success: false,
          message: "Admin can update only users",
        });
      }

      let updateObj = {
        ...req.body,
      };
      if (req.body && req.body.password) {
        const salt = await bcrypt.genSalt(10);
        updateObj.password = await bcrypt.hash(req.body.password, salt);
      }
      if (req.file) {
        if (existUser.public_id) {
          await cloudinary.uploader.destroy(existUser.public_id);
        }
        updateObj.avatar = req.file.path;
        updateObj.public_id = req.file.filename;
      }

      const updatedUser = await UserModel.findByIdAndUpdate(id, updateObj, {
        new: true,
      });
      return res.status(httpStatusCode.OK).json({
        success: true,
        message: "User updated successfully",
        data: updatedUser,
      });
    } catch (error) {
      return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }

  // TOGGLE STATUS

  async toggleUserStatus(req, res) {
    try {
      const { id } = req.params;

      const user = await UserModel.findById(id);

      if (!user) {
        return res.status(httpStatusCode.NOT_FOUND).json({
          success: false,
          message: "User not found",
        });
      }

      const updatedUser = await UserModel.findByIdAndUpdate(
        id,
        {
          status: !user.status,
        },
        {
          new: true,
        },
      );

      return res.status(httpStatusCode.OK).json({
        success: true,
        message: `User ${
          updatedUser.status ? "activated" : "deactivated"
        } successfully`,
        data: updatedUser,
      });
    } catch (error) {
      return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }

  //  SOFT DELETE

  async softDelete(req, res) {
    try {
      const { id } = req.params;
      const existUser = await UserModel.findById(id);
      if (!existUser) {
        return res.status(httpStatusCode.NOT_FOUND).json({
          success: false,
          message: "User not found",
        });
      }
      const roleData = await roleModel.findById(existUser.roleId);

      if (req.user.role === "admin" && roleData.role !== "user") {
        return res.status(httpStatusCode.FORBIDDEN).json({
          success: false,
          message: "Admin can delete only users",
        });
      }
      if (existUser.public_id) {
        await cloudinary.uploader.destroy(existUser.public_id);
      }
      const deletedUser = await UserModel.findByIdAndUpdate(
        id,
        {
          isDeleted: true,
        },
        {
          new: true,
        },
      );
      return res.status(httpStatusCode.OK).json({
        success: true,
        message: "User deleted successfully",
        data: deletedUser,
      });
    } catch (error) {
      return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }

  // RECOVER

  async recover(req, res) {
    try {
      const { id } = req.params;
      const existUser = await UserModel.findById(id);
      if (!existUser) {
        return res.status(httpStatusCode.NOT_FOUND).json({
          success: false,
          message: "User not found",
        });
      }
      const roleData = await roleModel.findById(existUser.roleId);

      if (req.user.role === "admin" && roleData.role !== "user") {
        return res.status(httpStatusCode.FORBIDDEN).json({
          success: false,
          message: "Admin can delete only users",
        });
      }
      if (existUser.public_id) {
        await cloudinary.uploader.destroy(existUser.public_id);
      }
      const deletedUser = await UserModel.findByIdAndUpdate(
        id,
        {
          isDeleted: false,
        },
        {
          new: true,
        },
      );
      return res.status(httpStatusCode.OK).json({
        success: true,
        message: "User deleted successfully",
        data: deletedUser,
      });
    } catch (error) {
      return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }

  // CHANGE PASSWORD

  async changePassword(req, res) {
    try {
      const userId = req.user.id;
      const { oldPassword, newPassword } = req.body;
      if (!oldPassword || !newPassword) {
        return res.status(httpStatusCode.BAD_REQUEST).json({
          success: false,
          message: "All fields are required",
        });
      }
      const user = await UserModel.findById(userId);
      if (!user) {
        return res.status(httpStatusCode.NOT_FOUND).json({
          success: false,
          message: "User not found",
        });
      }
      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) {
        return res.status(httpStatusCode.BAD_REQUEST).json({
          status: false,
          message: "Wrong password",
        });
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);
      const result = await UserModel.findByIdAndUpdate(
        userId,
        {
          password: hashedPassword,
        },
        { new: true },
      );
      return res.status(httpStatusCode.OK).json({
        success: true,
        message: "Password changed successfully",
      });
    } catch (error) {
      return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = new UserController();
