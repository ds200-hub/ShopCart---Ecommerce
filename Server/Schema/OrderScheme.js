const mongoose = require("mongoose");
const {Schema} = mongoose;

const orderSchema = new Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        razorpayOrderId: {
            type: String,
            required: true,
        },
        razorpayPaymentId: {
            type: String,
            required: true,
        },
        products: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "ProductModel",
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                    default: 1,
                },
                price: {
                    type: Number,
                    required: true,
                },
            },
        ],
        shippingAddress: {
            fullName: String,
            phone: String,
            street: String,
            city: String,
            pincode: String,
        },
        deliveryStatus: {
            type: String,
            enum: ["Arriving", "Delivered"],
            default: "Arriving",
        },
    },
    { timestamps: true }
);

const orderModel =  mongoose.model("orderModel", orderSchema);

module.exports = orderModel;