const { cartModel } = require("./connection");

const findAllFromCart = async (req, res, next) => {
  const products = await cartModel.find({});
  //   console.log("inside findAllFromCart");
  //   console.log(products.length);
  return products;
};
const findByIdCart = async (req, res, next) => {
  console.log("inside findbyidcart");
  const productId = req.body.productId;
  const product = await cartModel.findById(productId);
  console.log(product);
  return product;
};
module.exports.findAllFromCart = findAllFromCart;
module.exports.findByIdCart = findByIdCart;
