const cartModel = require("../Schema/CartSchema");

const cartController = async (req, res) => {
    try {
        const { ProductId, price, id } = req.body;
        const cartData = new cartModel({
            userId: id,
            items: [
                {
                    productId: ProductId
                }
            ],
            totalPrice: price
        });
        const cart = await cartData.save();
        return res.status(200).json({ success: true, message: "Product added" });
    }
    catch(err){
        console.log(err);
    }
}

module.exports = cartController;
