const mongoose = require("mongoose");
const logger = require("../utils/logger");
const Dbcon = async () => {
  try {
    // console.log("ENV VALUE:", process.env.MONGODB_URL);
    await mongoose.connect(process.env.MONGODB_URL);
    logger.info("Database Connected");
  } catch (error) {
    logger.error(error);
  }
};
module.exports = Dbcon;
