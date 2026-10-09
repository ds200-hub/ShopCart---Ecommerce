const orderModel = require("../Schema/OrderScheme");

const orderPlaced = async(req, res) => {
    const {razorpay_order_id, razorpay_payment_id, carts, shippingAddress, userId} = req.body;
    // console.log(carts);
    try{
        const orderProducts = carts.map((cart) => ({
            productId: cart.items[0].productId,
            quantity: cart.items[0].quantity,
            price: cart.totalPrice
        }));
        const order = new orderModel({
            userId : userId,
            razorpayOrderId: razorpay_order_id,
            razorpayPaymentId: razorpay_payment_id,
            products: orderProducts,
            shippingAddress: shippingAddress
        });

        const orderSaved = await order.save();
        return res.status(200).json({success: true, message: "Order Successfully Placed"});
    }
    catch(err){
        console.log(err);
    }
}

module.exports = orderPlaced; 