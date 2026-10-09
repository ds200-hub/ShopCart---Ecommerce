const ProductModel = require("../Schema/ProductSchema");

const deleteSellerProduct = async(req, res) => {
    const {productId} = req.body;
    try{
        const product = await ProductModel.findByIdAndDelete(productId);
        return res.json({success: true, message: "seller product successfully deleted"});
    }
    catch(err){
        console.log(err);
    }
}

module.exports = deleteSellerProduct;