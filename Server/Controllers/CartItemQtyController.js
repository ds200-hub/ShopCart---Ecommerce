const cartModel = require("../Schema/CartSchema");

const cartItemQtyController = async (req, res) => {
    try {
        const { updatedQty } = req.body;
        const { id } = req.params;
        const cart = await cartModel.findById(id).populate('items.productId');
        cart.items[0].quantity = updatedQty;
        cart.totalPrice = cart.items[0].productId.PriceAfterDiscount * updatedQty;
        const result = await cart.save();
        return res.status(200).json({ success: true });
    }
    catch (err) {
        console.log(err);
    }

}

module.exports = cartItemQtyController;
