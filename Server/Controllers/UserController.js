const bcrypt = require("bcrypt");
const userModel = require("../Schema/UserSchema");
const createToken = require("../Util/SecretToken");

const signUpController = async (req, res) => {
    const { name, email, password, confirmPassword, role } = req.body;
    if (!name || !email || !password || !confirmPassword) {
        return res.status(400).json({ success: false, message: "Input fields are missing" });
    }
    if (password != confirmPassword) {
        return res.status(400).json({ suceess: false, message: "Password not matches" });
    }
    const user = await userModel.findOne({ email });
    if (user) {
        return res.status(409).json({ success: false, message: "user already exists" });
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const userData = new userModel({
        name,
        email,
        password: hashedPassword,
        role
    });

    const result = await userData.save();

    const token = createToken(result._id);

    if (user.role == "user") {
        res.cookie("userToken", token, {
            withCredentials: true,
            httpOnly: false,
        });
    }
    else {
        res.cookie("sellerToken", token, {
            withCredentials: true,
            httpOnly: false,
        });
    }

    return res.status(201).json({ success: true, message: "User Successfully Registered", id: result._id, role: result.role });
}


const loginController = async (req, res) => {

    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ success: false, message: "Input fields are missing" });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
        return res.status(404).json({ success: false, message: "This user not exists" });
    }

    const passwordMatched = await bcrypt.compare(password, user.password);

    if (!passwordMatched) {
        return res.status(401).json({ success: false, message: "Incorrect Password" });
    }

    const token = createToken(user._id);

    if (user.role == "user") {
        res.cookie("userToken", token, {
            withCredentials: true,
            httpOnly: false,
        });
    }
    else {
        res.cookie("sellerToken", token, {
            withCredentials: true,
            httpOnly: false,
        });
    }

    return res.status(200).json({ success: true, message: "Successfully LogedIn", id: user._id, role: user.role });
}

module.exports = { signUpController, loginController };