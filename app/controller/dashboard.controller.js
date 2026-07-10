const productModel = require("../model/productModel");
const categoryModel = require("../model/categoryModel");
const subCategoryModel = require("../model/subCategoryModel");
const httpStatusCode = require("../utils/httpStatusCode");

class DashboardController {
  async dashboard(req, res) {
    try {
      const totalProducts = await productModel.aggregate([
        {
          $match: {
            isDeleted: false,
          },
        },
        {
          $count: "totalProducts",
        },
      ]);

      const totalCategories = await categoryModel.aggregate([
        {
          $match: {
            isDeleted: false,
          },
        },
        {
          $count: "totalCategories",
        },
      ]);

      const totalSubCategories = await subCategoryModel.aggregate([
        {
          $match: {
            isDeleted: false,
          },
        },
        {
          $count: "totalSubCategories",
        },
      ]);

      const productsByCategory = await productModel.aggregate([
        {
          $match: {
            isDeleted: false,
          },
        },
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
        {
          $group: {
            _id: "$category.categoryName",
            totalProducts: {
              $sum: 1,
            },
          },
        },
        {
          $project: {
            _id: 0,
            categoryName: "$_id",
            totalProducts: 1,
          },
        },
      ]);

      const productsBySubCategory = await productModel.aggregate([
        {
          $match: {
            isDeleted: false,
          },
        },
        {
          $lookup: {
            from: "subcategories",
            localField: "subCategoryId",
            foreignField: "_id",
            as: "subCategory",
          },
        },
        {
          $unwind: "$subCategory",
        },
        {
          $group: {
            _id: "$subCategory.subCategoryName",
            totalProducts: {
              $sum: 1,
            },
          },
        },
        {
          $project: {
            _id: 0,
            subCategoryName: "$_id",
            totalProducts: 1,
          },
        },
      ]);

      return res.status(httpStatusCode.OK).json({
        success: true,
        data: {
          totalProducts: totalProducts[0]?.totalProducts || 0,
          totalCategories: totalCategories[0]?.totalCategories || 0,
          totalSubCategories: totalSubCategories[0]?.totalSubCategories || 0,
          productsByCategory,
          productsBySubCategory,
        },
      });
    } catch (error) {
      return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = new DashboardController();
