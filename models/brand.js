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
    required: true 
    },
});

BrandSchema.virtual("url").get(function () {
    return "/brand/" + this._id;
  });

module.exports = mongoose.model("category", BrandSchema);