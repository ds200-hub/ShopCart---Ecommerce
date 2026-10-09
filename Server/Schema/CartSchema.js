const mongoose = require("mongoose");
const { Schema } = mongoose;

const cartSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "userModel",
    },

    items: [
        {
            productId: {
                type: Schema.Types.ObjectId,
                ref: "ProductModel",
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                min: 1,
                default: 1,
            },
        },
    ],
    totalPrice: {
        type: Number,
        required: true,
        default: 0,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const cartModel = mongoose.model("cartModel", cartSchema);

module.exports = cartModel;