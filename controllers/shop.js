const addToCart = require("../models/product");
const { productModel } = require("../models/connection");
const { cartModel } = require("../models/connection");
const { findAllFromCart } = require("../models/cart");
const { fetchDetailProduct } = require("../models/product");
const { findByIdCart } = require("../models/cart");
exports.getIndex = async (req, res, next) => {
  const result = await addToCart.fetchAll(req, res, next);
  res.render("./shop/index", {
    prods: result,
    pageTitle: "Shop",
    path: "/",
  });
};
exports.getProducts = async (req, res, next) => {
  const result = await addToCart.fetchAll(req, res, next);
  res.render("./shop/product-list", {
    prods: result,
    pageTitle: "All Products",
    path: "/products",
  });
};

exports.getCart = async (req, res, next) => {
  //   console.log("inside getCart");
  const cartProducts = await findAllFromCart(req, res, next);
  //   console.log(typeof cartProducts);
  //   console.log(cartProducts);
  res.render("shop/cart", {
    path: "/cart",
    pageTitle: "Your Cart",
    products: cartProducts,
  });
};

exports.postCart = async (req, res, next) => {
  //   console.log("inside postCart");
  const productId = req.body.productId;
  const product = await productModel.findById(productId);
  //   console.log(product);
  //   console.log(productId);
  const duplicate = await cartModel.findById(productId);

  if (duplicate) {
    // console.log("inside duplicate");
    // console.log(duplicate.quantity + 1);
    duplicate.quantity = duplicate.quantity + 1 || 1;
    await duplicate.save();
  } else {
    let cartProduct = new cartModel({
      _id: product._id,
      title: product.title,
      imageUrl: product.imageUrl,
      description: product.description,
      price: product.price,
    });
    let result = await cartProduct.save();
  }

  //   console.log("-----------------------------------");
  //   console.log(result);
  //   console.log(typeof result.quantity);
  res.redirect("/cart");
};

exports.postCartDeleteProduct = async (req, res, next) => {
  //   console.log("inside postcardeleteitem");
  const product = await findByIdCart(req, res, next);
  //   console.log(product);
  if (product.quantity > 1) {
    // console.log("inside if");
    product.quantity--;
    const data = await product.save();
  } else {
    // console.log("inside else");
    const data = await cartModel.deleteOne({ _id: product._id });
  }
  res.redirect("/cart");
};

exports.getProduct = async (req, res, next) => {
  //   console.log(req.params);
  //   console.log("getproduct starts");
  const detail = await fetchDetailProduct(req, res, next);
  //   console.log(detail);
  //   console.log("inside getProduct");
  res.render("shop/product-detail", {
    product: detail,
    pageTitle: detail.title,
    path: "/products",
  });
};

exports.postCartAddProduct = async (req, res, next) => {
  console.log("inside postCartAddProduct");
  console.log(req.body);
  const product = await findByIdCart(req, res, next);
  product.quantity++;
  const result = await product.save();
  res.redirect("/cart");
};

//left

exports.getOrders = (req, res, next) => {
  res.render("./shop/orders", {
    path: "/orders",
    pageTitle: "Your Orders",
  });
};
exports.getCheckout = (req, res, next) => {
  res.render("./shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};
