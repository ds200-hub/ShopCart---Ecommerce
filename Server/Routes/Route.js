const cartController = require("../Controllers/CartController");

const cartItem = require("../Controllers/CartItemController");
const cartItemQtyController = require("../Controllers/CartItemQtyController");

const deleteCartItem = require("../Controllers/DeleteCartItem");
const orderPlaced = require("../Controllers/OrderPlacedController");
const orderPlacedProducts = require("../Controllers/orderPlacedProductsController");
const createOrder = require("../Controllers/PaymentController");
const productController = require("../Controllers/ProductController");
const uploadProduct = require("../Controllers/UploadProductController");
const { signUpController, loginController } = require("../Controllers/UserController");
const deleteCookie = require("../Util/deleteCookie");
const userVerification = require("../Util/UserVerification");
const { upload } = require("../cloudConfig.js");
const sellerProducts = require("../Controllers/SellerProductGetController.js");
const deleteSellerProduct = require("../Controllers/DeleteSellerProductController.js");

const router = require("express").Router();

router.get("/Product", productController);
router.post("/Login", loginController);
router.post("/Signup", signUpController);
router.post("/Product/Cart", cartController);
router.post("/Product/Cart/CartItem", cartItem);
router.delete("/Product/Cart/CartItem/:id", deleteCartItem);
router.patch("/Product/Cart/CartItem/qtyUpdate/:id", cartItemQtyController);
router.get("/userVerification", userVerification);

router.post("/deleteCookie", deleteCookie);

router.post('/payment/create-order', createOrder);
router.post('/orders/verify-and-save', orderPlaced);

router.post('/user/account', orderPlacedProducts);

router.post('/uploadProduct',upload.single("image"), uploadProduct);
router.post('/sellerProducts', sellerProducts);

router.delete('/sellerProduct/deleteProduct', deleteSellerProduct);

module.exports = router;