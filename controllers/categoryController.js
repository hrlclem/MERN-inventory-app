const { body, validationResult } = require("express-validator");
const validator = require("express-validator");
// const body = validator.body;
// const validationResult = validator.validationResult;
const Category = require("../models/category");
const Product = require("../models/product");

const async = require("async");


exports.category_list = (req,res) =>{
    Category.find()
        // filter find function
        .sort([['name', 'ascending']])
        // execute action
        .exec((function(err, list_category){
            if(err){
                return next(err);
            }
            res.render("categories_list", {
                title: "List of categories",
                category_list: list_category,
            })
        }))}

exports.category_add_get = (req,res) =>{
    res.render("categories_form", { title: "Create a new category" });
}

exports.category_add_post = (req,res) =>{
    [
        body("name", "Category name is required").trim().escape(),
        async (req, res, next) => {
            const errors = validationResult(req);
            const category = new category({ name : req.body.name });

            // in case of error
            if (!errors.isEmpty()) {                                   
                res.render("categories_form", {
                    title: "Create a new category",
                    category, 
                    errors: errors.array()
                });
                return;
            } else {
                // search for matching category
                Category.findOne({ name : req.body.name }).exec((err, found_category) => {
                    // if error
                    if (err) {
                        return next(err);
                    }
                    // if found matching category name
                    if (found_category) {
                        res.redirect(found_category.url)
                    } else {
                        // if no matching not found, save
                        category.save((err) => {
                            // if can't save, error
                            if (err) {
                                return next(err);
                            }
                            res.redirect(category.url)
                        })
                    }
                })
            }
        }
    
    ]
}

exports.category_delete_post = (req,res) =>{
    res.send("NOT IMPLMENTED: category delete post")
}

exports.category_delete_get = (req,res) =>{
    res.send("NOT IMPLMENTED: category delete get")
}

exports.category_update_post = (req,res) =>{
    res.send("NOT IMPLMENTED: category update post")
}

exports.category_update_get = (req,res) =>{
    res.send("NOT IMPLMENTED: category update get")
}

exports.category_detail = (req,res) =>{
    async.parallel(
        {
            category(callback){
                // Search category with specific ID
                Category.findById(req.params.id)
                    .exec(callback);
            },
            category_products(callback){
                // Search products with specific brand ID
                Product.find({ categories: req.params.id })
                    .exec(callback);
            }
        },
        (err, results) => {
            if(err){
                return next(err);
            }
            if (results.category == null) {
                const err = new Error("Category not found");
                err.status = 404;
                return next(err);
            }
            res.render("categories_detail", {
                title: "Categories details",
                categories: results.category,
                products_category: results.category_products,
            },
            )
        }
    )
}