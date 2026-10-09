const jwt = require("jsonwebtoken");
const cartModel = require("../Schema/CartSchema");
const userModel = require("../Schema/UserSchema");
require("dotenv").config();
const userVerification = async (req, res) => {
    const {role} = req.query;

    let token;
    if(role == "user"){
        token = req.cookies.userToken;
    }
    else{
        token = req.cookies.sellerToken;
    }

    if (!token) {
        return res.json({ success: false });
    }

    const result = jwt.verify(token, process.env.Token_Key);
    const { id } = result;

    const user = await userModel.findById(id);

    console.log(user);

    return res.json({ success: true, userId: id, name: user.name, year: new Date(user.createdAt).getFullYear(), email: user.email, role: user.role });
}

module.exports = userVerification;