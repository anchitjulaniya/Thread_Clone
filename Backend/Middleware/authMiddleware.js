const jwt = require('jsonwebtoken');
const UserSchema = require('../Model/user');

const authMiddleware = async (req, res, next)=>{
    try{
        const bearertoken = req.header.authorization;
        if(!bearertoken){
            return req.json({
                status : false,
                message : "Incorrect token"
            })
        }

        const token = bearertoken.split("")[1]; 
        jwt.verify(token, process.env.JWT_SCRETE_KEY) //verify Token

        const tokenData = jwt.decode(token)
        console.log.log("Token Data", tokenData)

        const currentTimeInSeconds = Math.floor(new Date().getTime() / 1000);

        if(currentTimeInSeconds > tokenData.expiry){
            return res.status(401).json({
                status : false,
                message: "unauthorized!"
            })
        }

        const user = await UserSchema.findById(tokenData.userid)
        if(!user){
            return res.status(401).json({
                status : false,
                message: "unauthorized!"
            })
        }
        
        console.log(req.user, "Request user data")
        console.log(user, "MongoDB user data")

        req.user = user;
        
        next();
    }
    catch(error){
        res.json({
            status: false,
            message: "Something Went Wrong. Please try again!",
            errorMessage: error,
          })
    }
}

module.exports = authMiddleware




