const Joi = require("joi");
const mongoose = require("mongoose");

const productValidation = Joi.object({
  productName: Joi.string().trim().min(2).max(100).required().messages({
    "string.empty": "Product name is required",
    "string.min": "Product name must be at least 2 characters long",
    "string.max": "Product name cannot exceed 100 characters",
    "any.required": "Product name is required",
  }),

  categoryId: Joi.string()
    .required()
    .custom((value, helpers) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.error("any.invalid");
      }
      return value;
    })
    .messages({
      "string.empty": "Category ID is required",
      "any.required": "Category ID is required",
      "any.invalid": "Invalid Category ID",
    }),

  subCategoryId: Joi.string()
    .required()
    .custom((value, helpers) => {
      if (!mongoose.Types.ObjectId.isValid(value)) {
        return helpers.error("any.invalid");
      }
      return value;
    })
    .messages({
      "string.empty": "Subcategory ID is required",
      "any.required": "Subcategory ID is required",
      "any.invalid": "Invalid Subcategory ID",
    }),

  price: Joi.number().positive().required().messages({
    "number.base": "Price must be a number",
    "number.positive": "Price must be greater than 0",
    "any.required": "Price is required",
  }),

  description: Joi.string().trim().max(500).allow("").optional().messages({
    "string.max": "Description cannot exceed 500 characters",
  }),

  stock: Joi.number().integer().min(0).optional().messages({
    "number.base": "Stock must be a number",
    "number.integer": "Stock must be an integer",
    "number.min": "Stock cannot be negative",
  }),
});

module.exports = productValidation;
