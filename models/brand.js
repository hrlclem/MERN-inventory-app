const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BrandSchema = new Schema({
  name: {
    type: String, 
    min: [3, "Brand length is too small"],
    required: [true, "please add a brand"]
    },
  products: [{ 
    type: Schema.Types.ObjectId, 
    ref:"products"
    }],
  imageURL: { 
    type: String, 
    },
});

BrandSchema.virtual("url").get(function () {
    return "/brands/" + this._id;
  });

module.exports = mongoose.model("Brand", BrandSchema);