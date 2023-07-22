const mongoose = require("mongoose");
const addToCart = require("../models/product");
const { productModel } = require("../models/connection");

exports.getAddProduct = (req, res, next) => {
  res.render("./admin/add-product", {
    pageTitle: "Add Product",
    path: "/admin/add-product",
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true,
  });
};
exports.getProducts = async (req, res, next) => {
  const result = await addToCart.fetchAll(req, res, next);
  //   console.log(typeof result);
  //   console.log("here");
  res.render("admin/products", {
    prods: result,
    pageTitle: "Admin Products",
    path: "/admin/products",
  });
};

async function postAddProduct(req, res, next) {
  addToCart.productSave(req, res, next);
  res.redirect("/");
}

async function postEditProduct(req, res, next) {
  //   console.log("inside postEditProduct");
  //   console.log(req.body);
  const prod_id = req.body.productId;
  await productModel.findByIdAndUpdate(prod_id, {
    title: req.body.title,
    imageUrl: req.body.imageUrl,
    price: req.body.price,
    description: req.body.description,
  });

  res.redirect("./products");
}
function postDeleteProduct(req, res, next) {
  //   console.log(req.body);
  addToCart.deleteById(req, res, next);
  res.redirect("/admin/products");
}
function getEditProduct(req, res, next) {
  addToCart.findProductById(req, res, next);
}
module.exports.postAddProduct = postAddProduct;
module.exports.postEditProduct = postEditProduct;
module.exports.postDeleteProduct = postDeleteProduct;
module.exports.getEditProduct = getEditProduct;
