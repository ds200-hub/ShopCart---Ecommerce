const ProductModel = require("../Schema/ProductSchema");

const sellerProducts = async(req, res) => {
    const {userId} = req.body;
    try{
        const result = await ProductModel.find({sellerId: userId});
        return res.json({success: true, result: result});
    }
    catch(err){
        console.log(err);
    }
}

module.exports = sellerProducts;