const productModel = require("../model/productModel");
const httpStatusCode = require("../utils/httpStatusCode");
const productValidation = require("../validation/productValidation");

class ProductController {
  async createProduct(req, res) {
    try {
      const { error } = productValidation.validate(req.body);

      if (error) {
        return res.status(httpStatusCode.BAD_REQUEST).json({
          success: false,
          message: error.details[0].message,
        });
      }
      const {
        productName,
        categoryId,
        subCategoryId,
        price,
        description,
        stock,
      } = req.body;

      const product = new productModel({
        productName,
        categoryId,
        subCategoryId,
        price,
        description,
        stock,
      });
      const result = await product.save();
      return res.status(httpStatusCode.CREATED).json({
        success: true,
        message: "Product created",
        data: result,
      });
    } catch (error) {
      return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }
  async getProducts(req, res) {
    try {
      const data = await productModel.aggregate([
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
  async getProductById(req, res) {
    try {
      const { id } = req.params;

      const product = await productModel.findById(id);

      if (!product || product.isDeleted) {
        return res.status(httpStatusCode.NOT_FOUND).json({
          success: false,
          message: "Product not found",
        });
      }

      return res.status(httpStatusCode.OK).json({
        success: true,
        data: product,
      });
    } catch (error) {
      return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }
  async updateProduct(req, res) {
    try {
      const { id } = req.params;

      const product = await productModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      return res.status(httpStatusCode.OK).json({
        success: true,
        message: "Product updated successfully",
        data: product,
      });
    } catch (error) {
      return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }
  async deleteProduct(req, res) {
    try {
      const { id } = req.params;

      const product = await productModel.findByIdAndUpdate(
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
        message: "Product deleted successfully",
        data: product,
      });
    } catch (error) {
      return res.status(httpStatusCode.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }
}
module.exports = new ProductController();
