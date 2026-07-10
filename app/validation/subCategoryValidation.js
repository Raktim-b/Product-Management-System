const Joi = require("joi");
const mongoose = require("mongoose");

const subCategoryValidation = Joi.object({
  subCategoryName: Joi.string().trim().min(2).max(50).required().messages({
    "string.empty": "Subcategory name is required",
    "string.min": "Subcategory name must be at least 2 characters long",
    "string.max": "Subcategory name cannot exceed 50 characters",
    "any.required": "Subcategory name is required",
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
});

module.exports = subCategoryValidation;
