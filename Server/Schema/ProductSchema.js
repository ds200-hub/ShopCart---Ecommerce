const mongoose = require("mongoose");
const { Schema } = mongoose;

const ProductSchema = new Schema({
    Name: String,
    Image: String,
    Category: String,
    Price: Number,
    Discount: Number,
    PriceAfterDiscount: Number,
    Stock: Number,
    shopName: String,
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    CreatedAt: { type: Date, default: Date.now }
});

const ProductModel = mongoose.model("ProductModel", ProductSchema);

module.exports = ProductModel;