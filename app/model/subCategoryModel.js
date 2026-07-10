const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subCategorySchema = new Schema(
  {
    subCategoryName: {
      type: String,
      required: true,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "category",
      required: true,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);
const subCategoryModel = mongoose.model("subcategory", subCategorySchema);
module.exports = subCategoryModel;
