const { nextTick } = require("async");
const { body, validationResult } = require("express-validator");
const validator = require("express-validator");
const async = require("async");
const Product = require("../models/product")
const Category = require("../models/category")
const Brand = require("../models/brand")


exports.product_list = (req,res) =>{
    Product.find()
        // filter find function
        .sort('name', 'ascending')
         // execute action
        .exec((function(err, list_product){
            if(err){
                return next(err);
            }
            res.render("products_list", {
                title: "Products list",
                list_product: list_product
            })
        }))
}

exports.product_add_get = (req,res) =>{
    async.parallel(
        {
            // Get all Brands and Categories
            brands(callback){
                Brand.find(callback);
            },
            categories(callback){
                Category.find(callback);
            }
        },
        (err, results) => {
            if(err){
                return next(err);
            }
            res.render("products_form", { 
                title: "Create a new product",
                brands: results.brands,
                categories: results.categories,
             });
        }
    )
}

exports.product_add_post = (req,res, next) => [
    body("name")
        .trim()
        .isLength({ min: 3 })
        .escape(),
    body("price")
        .trim()
        .escape()
        .isInt(),
    body("stock")
        .trim()
        .escape()
        .isInt(),
    body("categories")
        .trim()
        .escape(),
    body("brand")
        .trim()
        .escape(),
    (req, res, results) => {
        const errors= validationResult(req);

        const product = new Product({
            name: req.body.name,
            price: req.body.price,
            stock: req.body.price,
            categories: req.body.categories,
            brand: req.body.brand,
        });

        if(!errors.isEmpty()){
            res.render("products_form", {
                title: "Create a new product",
                name: req.body.name, 
                errors: errors.array(),
            });
            return;
        }
        product.save((err) => {
            if (err) {
              return next(err);
            }
            console.log(product)
            res.redirect(product.url);
        });
    }
]

exports.product_delete_post = (req,res) =>{
    res.send("NOT IMPLMENTED: product delete post")
}

exports.product_delete_get = (req,res) =>{
    res.send("NOT IMPLMENTED: product delete get")
}

exports.product_update_post = (req,res) =>{
    res.send("NOT IMPLMENTED: product update post")
}

exports.product_update_get = (req,res) =>{
    res.send("NOT IMPLMENTED: product update get")
}

exports.product_detail = (req,res) =>{
    Product.find()
    .sort([["name", "ascending"]])
    .exec(function (err, list_products) {
      if (err) {
        return next(err);
      }
      res.render("products_list", {
        title: "List of products",
        product_list: products_list,
      });
    });
}