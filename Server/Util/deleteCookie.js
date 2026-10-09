const deleteCookie = (req, res) => {
    const { role } = req.body;
    // res.clearCookie("userToken", {
    //         httpOnly: false,
    //         path: "/"
    //     });
    if (role == "user") {
        res.clearCookie("userToken", {
            httpOnly: false,
            path: "/"
        });
    }
    else {
        res.clearCookie("sellerToken", {
            httpOnly: false,
            path: "/"
        });
    }
    return res.status(200).json({
        success: true,
        message: "Logged out successfully"
    });

}

module.exports = deleteCookie;