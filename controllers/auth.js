const { userModel } = require("../models/connection");
const bcrypt = require("bcrypt");
exports.getLogin = (req, res, next) => {
  res.render("./auth/login", {
    path: "/login",
    pageTitle: "Login",
    errorMessage: req.flash("error"),
  });
};
exports.getSignup = (req, res, next) => {
  res.render("./auth/signup", {
    path: "/signup",
    pageTitle: "Signup",
  });
};
exports.postLogin = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const user = await userModel.findOne({ email: email });
  if (!user) {
    return res.redirect("/signup");
  }
  const b = await bcrypt.compare(password, user.password);
  if (b) {
    req.session.isLoggedIn = true;
    req.session.user = user;
    return req.session.save((err) => {
      console.log(err);
      res.redirect("/");
    });
  }
};
exports.postSignup = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const repeatEmail = await userModel.findOne({ email: email });
  if (repeatEmail) {
    return res.redirect("/login");
  }
  const hashedpsw = await bcrypt.hash(password, 12);
  const user = new userModel({
    email: email,
    password: hashedpsw,
  });
  const result = await user.save();

  console.log(result);
  return res.redirect("/login");
};
exports.postLogout = (req, res, next) => {};
