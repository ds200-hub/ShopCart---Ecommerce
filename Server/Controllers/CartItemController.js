const cartModel = require("../Schema/CartSchema");

const cartItem = async (req, res) => {
    const {userId} = req.body;
    try {
        const items = await cartModel.find({userId: userId}).populate("items.productId");
        let subTotalPrice = 0; 
        items.forEach((cart)=>{
            // console.log(cart);
            cart.items.forEach((item)=>{
                subTotalPrice += cart.totalPrice;
            });
        });
        return res.status(200).json({success: true, data:items, totalPrice: subTotalPrice});
    }
    catch (err) {
        console.log(err); 
    }
}

module.exports = cartItem;
