const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  name: {
    type: String, 
    min: [3, "Product length is too small"],
    max: [30, "Product length is too long"],
    required: [true, "Please add a product"]
    },
  price: {
    type: Number,
    max: [9999, "Product price is too high"],
    required: [true, "Please add a price"]
  },
  stock: {
    type: Number,
    max: [9999, "Product quantity is too high"],
    required: [true, "Please add quantity"]
  },
  categories: [{ 
    type: Schema.Types.ObjectId, 
    ref: "category"
    }],
  brand: { 
    type: Schema.Types.ObjectId, 
    ref: "brand"
    },    
  // imageURL: { 
  //   type: String, 
  //   required: true 
  //   },
});

ProductSchema.virtual("url").get(function () {
    return "/inventory/category/products/" + this._id;
  });

module.exports = mongoose.model("Product", ProductSchema);