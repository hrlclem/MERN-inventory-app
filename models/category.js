const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: {
    type: String, 
    min: [3, "Category length is too small"],
    required: [true, "please add a category"]
    },
  products: [{ 
    type: Schema.Types.ObjectId, 
    ref:"products"
    }],
  imageURL: { 
    type: String, 
    required: true 
    },
});

CategorySchema.virtual("url").get(function () {
    return "/categories/" + this._id;
  });

module.exports = mongoose.model("Category", CategorySchema);