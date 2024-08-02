const jwt = require('jsonwebtoken');
const UserSchema = require('../Model/user');

const authMiddleware = async (req, res, next) => {
    try {
        // const bearertoken = req.headers['authorization'];
        
        // if (!bearertoken) {
        //     return res.status(401).json({
        //         status: false,
        //         message: "Token is required"
        //     });
        // }
        
        if(!req.cookies.token){
            return res.status(401).json({message : "unauthorised"})
        }
        // console.log("token from Cookie after", req.cookies.token)

        const token = req.cookies.token  // || bearertoken.split(" ")[1];

        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY); // verify Token

        console.log("Token Data- authMiddleware", decodedToken);

        const currentTimeInSeconds = Math.floor(new Date().getTime() / 1000);

        if (currentTimeInSeconds > decodedToken.expiry) {
            return res.status(401).json({
                status: false,
                message: "Unauthorized! Token expired"
            });
        }

        const user = await UserSchema.findById(decodedToken.userid);
        if (!user) {
            return res.status(401).json({
                status: false,
                message: "Unauthorized! User not found"
            });
        }

        req.user = user;
        next();
    } catch (error) {
        console.log("Error in authMiddleware:", error);
        res.status(500).json({
            status: false,
            message: "Something went wrong. Please try again!",
            errorMessage: error,
        });
    }
};

module.exports = authMiddleware;
