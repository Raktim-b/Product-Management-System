const categoryModel = require("../model/categoryModel");
const subCategoryModel = require("../model/subCategoryModel");
const httpStatusCode = require("../utils/httpStatusCode");
const subCategoryValidation = require("../validation/subCategoryValidation");

class SubCategoryController {
  async createSubCategory(req, res) {
    try {
      const { error } = subCategoryValidation.validate(req.body);

      if (error) {
        return res.status(httpStatusCode.BAD_REQUEST).json({
          success: false,
          message: error.details[0].message,
        });
      }
      const { categoryId, subCategoryName } = req.body;

      const category = await categoryModel.findById(categoryId);

      if (!category) {
        return res.status(httpStatusCode.NOT_FOUND).json({
          success: false,
          message: "Category not found",
        });
      }

      const subCategory = new subCategoryModel({
        categoryId,
        subCategoryName,
      });
      const result = await subCategory.save();
      return res.status(httpStatusCode.CREATED).json({
        success: true,
        message: "SubCategory created",
        data: result,
      });
    } catch (error) {
      return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }
  async getSubCategories(req, res) {
    try {
      const data = await subCategoryModel.aggregate([
        { $match: { isDeleted: false } },
        {
          $lookup: {
            from: "categories",
            localField: "categoryId",
            foreignField: "_id",
            as: "category",
          },
        },
        {
          $unwind: "$category",
        },
      ]);

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
  async getSubCategoryById(req, res) {
    try {
      const { id } = req.params;

      const subCategory = await subCategoryModel.findById(id);

      if (!subCategory || subCategory.isDeleted) {
        return res.status(httpStatusCode.NOT_FOUND).json({
          success: false,
          message: "SubCategory not found",
        });
      }

      return res.status(httpStatusCode.OK).json({
        success: true,
        data: subCategory,
      });
    } catch (error) {
      return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }
  async updateSubCategory(req, res) {
    try {
      const { id } = req.params;

      const subCategory = await subCategoryModel.findByIdAndUpdate(
        id,
        req.body,
        {
          new: true,
        },
      );

      return res.status(httpStatusCode.OK).json({
        success: true,
        message: "SubCategory updated successfully",
        data: subCategory,
      });
    } catch (error) {
      return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }
  async deleteSubCategory(req, res) {
    try {
      const { id } = req.params;

      const subCategory = await subCategoryModel.findByIdAndUpdate(
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
        message: "SubCategory deleted successfully",
        data: subCategory,
      });
    } catch (error) {
      return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }
}
module.exports = new SubCategoryController();
