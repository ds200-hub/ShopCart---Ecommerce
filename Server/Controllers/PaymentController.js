const razorpayInstance = require("../Util/razorpayInstance");

const createOrder = async(req, res) => {
    
    try{
        const {amount} = req.body;

        const options = {
            amount: Number(amount*100),
            currency: 'INR',
            receipt: `receipt_${Date.now()}`
        };

        const order = await razorpayInstance.orders.create(options);

        res.status(200).json({
            success: true,
            order,
        });
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: 'Failed to create order',
            error: err.message,
        });
    }
};

module.exports = createOrder;