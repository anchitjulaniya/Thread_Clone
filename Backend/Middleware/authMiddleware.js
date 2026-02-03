const jwt = require('jsonwebtoken');
const UserSchema = require('../Model/user');

const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

  
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        status: false,
        message: "Authorization token missing or invalid",
      });
    }

    const token = authHeader.split(" ")[1];


        const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);

        const currentTimeInSeconds = Math.floor(new Date().getTime() / 1000);

        if (currentTimeInSeconds > decodedToken.exp) {
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
        // console.log("✅ authMiddleware passed");
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
