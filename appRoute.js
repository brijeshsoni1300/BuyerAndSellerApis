"use strict";

module.exports = function (app) {
  var Controller = require(".//app/controller/controller");
  var Buyer = require(".//app/controller/buyer");
  var Seller = require(".//app/controller/seller");
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });

  //buyer
  app.all("/buyer/list-of-sellers", Buyer.listOfSellers )
  app.all("/buyer/seller-catalog/:seller_id", Buyer.getsellerCatalogs )
  app.all("/buyer/create-order/:seller_id", Buyer.createOrder )
  app.all("/register", Controller.register )


  //seller
  app.all("/seller/create-catalog", Seller.createCatalog)
  app.all("/seller/orders", Seller.getorders)

 
};
