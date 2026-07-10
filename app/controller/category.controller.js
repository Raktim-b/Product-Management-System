const categoryModel = require("../model/categoryModel");
const httpStatusCode = require("../utils/httpStatusCode");
const categoryValidation = require("../validation/categoryValidation");

class CategoryController {
  async createCategory(req, res) {
    try {
      const { error } = categoryValidation.validate(req.body);

      if (error) {
        return res.status(httpStatusCode.BAD_REQUEST).json({
          success: false,
          message: error.details[0].message,
        });
      }
      const { categoryName } = req.body;

      const exist = await categoryModel.findOne({
        categoryName,
      });

      if (exist) {
        return res.status(httpStatusCode.BAD_REQUEST).json({
          success: false,
          message: "Category already exists",
        });
      }

      const category = new categoryModel({
        categoryName,
      });
      const result = await category.save();
      return res.status(httpStatusCode.CREATED).json({
        success: true,
        message: "Category created",
        data: result,
      });
    } catch (error) {
      return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }
  async getCategories(req, res) {
    try {
      const data = await categoryModel.find({
        isDeleted: false,
      });

      return res.status(httpStatusCode.OK).json({
        success: true,
        data,
      });
    } catch (error) {
      return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }
  async getCategoryById(req, res) {
    try {
      const { id } = req.params;

      const category = await categoryModel.findById(id);

      if (!category || category.isDeleted) {
        return res.status(httpStatusCode.NOT_FOUND).json({
          success: false,
          message: "Category not found",
        });
      }

      return res.status(httpStatusCode.OK).json({
        success: true,
        data: category,
      });
    } catch (error) {
      return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }
  async updateCategory(req, res) {
    try {
      const { id } = req.params;

      const category = await categoryModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      return res.status(httpStatusCode.OK).json({
        success: true,
        message: "Category updated successfully",
        data: category,
      });
    } catch (error) {
      return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }
  async deleteCategory(req, res) {
    try {
      const { id } = req.params;

      const category = await categoryModel.findByIdAndUpdate(
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
        message: "Category deleted successfully",
        data: category,
      });
    } catch (error) {
      return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }
}
module.exports = new CategoryController();
