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
    return "/category/" + this._id;
  });

module.exports = mongoose.model("category", CategorySchema);