module.exports = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    console.log("inside isAuth");
    return res.redirect("/login");
  }
  next();
};
