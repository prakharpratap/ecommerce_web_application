const { productModel } = require("./connection");

//saving to db new product
async function productSave(req, res, next) {
  let product = new productModel({
    title: req.body.title,
    imageUrl: req.body.imageUrl,
    description: req.body.description,
    price: req.body.price,
  });
  let result = await product.save();
  //   console.log("adding worked");
}

//fetching all info
async function fetchAll(req, res, next) {
  let result = await productModel.find({});
  //   console.log(result);
  return result;
  //   res.json(result);
}
//delete by id
async function deleteById(req, res, next) {
  let id = req.body.productId;
  let product = await productModel.findByIdAndDelete(id);
  //   console.log(
  //     `product has been deleted with title ${req.body.title} and id ${req.body.productId}`
  //   );
}

//find product by id
async function findProductById(req, res, next) {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  let id = req.params.productId;
  //   console.log(id);
  let result = await productModel.findById(id);
  if (result) {
    res.render("./admin/edit-product", {
      pageTitle: "Edit Product",
      path: "/admin/edit-product",
      editing: editMode,
      product: result,
    });
  } else {
    res.redirect("/");
  }
}
async function fetchDetailProduct(req, res, next) {
  id = req.params.productId;
  let result = await productModel.findById(id);
  return result;
}
module.exports.productSave = productSave;
module.exports.fetchAll = fetchAll;
module.exports.deleteById = deleteById;
module.exports.findProductById = findProductById;
module.exports.fetchDetailProduct = fetchDetailProduct;
