const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/shop", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const productSchema = new mongoose.Schema({
  title: String,
  imageUrl: String,
  description: String,
  price: String,
});

const cartSchema = new mongoose.Schema({
  title: String,
  imageUrl: String,
  description: String,
  price: String,
  quantity: {
    type: Number, // Number type
    default: 1,
  },
});
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports.productModel = mongoose.model("Product", productSchema);
module.exports.cartModel = mongoose.model("Cart", cartSchema);
module.exports.userModel = mongoose.model("User", userSchema);
