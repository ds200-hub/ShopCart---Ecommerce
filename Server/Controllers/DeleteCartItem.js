const cartModel = require("../Schema/CartSchema");

const deleteCartItem = async (req, res) => {
    try {
        const { id } = req.params;
        const cartItem = await cartModel.findByIdAndDelete(id);
        return res.status(200).json({success: true, messate: "CartItem Successfully Deleted"});
    }
    catch (err) {
        console.log(err);
    }
}

module.exports = deleteCartItem;