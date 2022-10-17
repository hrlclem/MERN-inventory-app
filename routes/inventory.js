const express = require("express");
const router = express.Router();

const home_controller = require("../controllers/homeController");
const product_controller = require("../controllers/bookController");
const category_controller = require("../controllers/categoryController");
const brand_controller = require("../controllers/brandController");

/// HOMEPAGE ROUTES ///
router.get("/inventory", home_controller.index);

/// PRODUCT ROUTES ///
router.get("/products", product_controller.product_list);
router.get("/products/add", product_controller.product_add_get);
router.get("/products/add", product_controller.product_add_post);
router.get("/products/:id/delete", product_controller.product_delete_post);
router.get("/products/:id/delete", product_controller.product_delete_get);
router.get("/products/:id/update", product_controller.product_update_post);
router.get("/products/:id/update", product_controller.product_update_get);
router.get("/products/:id", product_controller.product_detail);

/// CATEGORY ROUTES ///
router.get("/categories", category_controller.category_list);
router.get("/categories/add", category_controller.category_add_get);
router.get("/categories/add", category_controller.category_add_post);
router.get("/categories/:id/delete", category_controller.category_delete_post);
router.get("/categories/:id/delete", category_controller.category_delete_get);
router.get("/categories/:id/update", category_controller.category_update_post);
router.get("/categories/:id/update", category_controller.category_update_get);
router.get("/categories/:id", category_controller.category_detail);

/// BRAND ROUTES ///
router.get("/brands", brand_controller.brands_list);
router.get("/brands/add", brand_controller.brands_add_get);
router.get("/brands/add", brand_controller.brands_add_post);
router.get("/brands/:id/delete", brand_controller.brands_delete_post);
router.get("/brands/:id/delete", brand_controller.brands_delete_get);
router.get("/brands/:id/update", brand_controller.brands_update_post);
router.get("/brands/:id/update", brand_controller.brands_update_get);
router.get("/brands/:id", brand_controller.brands_detail);

module.exports = router;