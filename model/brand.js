const mongoose = require("mongoose");

const BrandSchema = mongoose.Schema(
  {
    brand: {
      type: String,
      require: true,
    },
    image: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  },
  { timestamps: true }
);

const BrandModel = mongoose.model("brand", BrandSchema);
module.exports = BrandModel;
