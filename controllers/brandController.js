const { body, validationResult } = require("express-validator");
const validator = require("express-validator");
const Brand = require("../models/brand");

exports.brands_list = (req,res) =>{
    res.render("brands_list", { title: "All brands:", brand_list:[1, 2, 3]});
}

exports.brands_add_get = (req,res) =>{
    res.render("brands_form", { title: "Create a new brand" });
}

exports.brands_add_post = [
        // data field input
        body("name", "Brand name is required").trim().escape(),  
        (req, res, next) => {
            const errors = validationResult(req);
            const brand = new Brand({ name : req.body.name });
            console.log(req.body.name)      

            // in case of error
            if (!errors.isEmpty()) {                                   
                res.render("brands_form", {
                    title: "Create a new brand",
                    brand, 
                    errors: errors.array()
                });
                console.log("err1")
                return;

            } else {
                // search for matching brand
                Brand.findOne({ name : req.body.name }).exec((err, found_brand) => {
                    console.log(found_brand);
                    // if error
                    if (err) {
                        console.log("err2")
                        return next(err);
                    }
                    // if found matching brand name
                    if (found_brand) {
                        res.redirect(found_brand.url)
                    } else {
                        // if no matching not found, save
                        brand.save((err) => {
                            // if can't save, error
                            if (err) {
                                console.log("err3")
                                return next(err);
                            }
                            res.redirect(brand.url)
                        })
                    }
                })
            }
        }
    
    ]


exports.brands_delete_post = (req,res) =>{
    res.send("NOT IMPLEMENTED: Brands delete post")
}

exports.brands_delete_get = (req,res) =>{
    res.send("NOT IMPLEMENTED: Brands delete get")
}

exports.brands_update_post = (req,res) =>{
    res.send("NOT IMPLEMENTED: Brands update post")
}

exports.brands_update_get = (req,res) =>{
    res.send("NOT IMPLEMENTED: Brands update get")
}

exports.brands_detail = (req,res) =>{
    res.send("NOT IMPLEMENTED: Brands detail")
}