const orderModel = require("../Schema/OrderScheme");
const ProductModel = require("../Schema/ProductSchema");

const orderPlacedProducts = async (req, res) => {
    const { userId } = req.body;
    try {
        const orders = await orderModel.find({ userId: userId }).populate("products.productId");
        const arr = [];
        orders.forEach((order) => {
            order.products.forEach((product) => {
                arr.push({
                    orderId: order.razorpayOrderId,
                    dateOfOrder: order.createdAt.toLocaleDateString("en-IN"),
                    status: order.deliveryStatus,
                    productImg: product.productId.Image,
                    productName: product.productId.Name,
                    productQty: product.quantity,
                    productTotalPrice: product.price
                });
            });
        });
        return res.json({ success: true, orders: arr });
    }
    catch (err) {
        console.log(err);
    }
}

module.exports = orderPlacedProducts;