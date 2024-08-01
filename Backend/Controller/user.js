const mongoose = require("mongoose");
const UserModel = require("../Model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  try {
    const { mobile, email, username, password } = req.body;
    const userList = await UserModel.findOne({
      $or: [{ email }, { username }],
    });

    if (userList) {
      return res.json({
        status: true,
        message: "User already registered. please login",
      });
    }

    const salt = bcrypt.genSaltSync(10);
    const pass = bcrypt.hashSync(req.body.password, salt);

    const user = {
      username: username,
      mobile: mobile,
      email: email,
      password: pass,
    };

    // cookie setup is pending

    // console.log(user);
    const newUser = await UserModel.create(user);
    // console.log(newUser)

    res.status(201).json({
      status: true,
      message: "Account Successfully Created",
    });
  } catch (error) {
    res.json({
      status: false,
      message: "Something Went Wrong. Please try again!",
      errorMessage: error,
    });
  }
};

const signin = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({
        status: false,
        message: "Entered Email is Wrong. Please try again!",
      });
    }

    const password = req.body.password;

    const isPasswordIsSame = await bcrypt.compare(
      password,
      user?.password || ""
    );
    if (!isPasswordIsSame) {
      return res.status(400).json({
        status: false,
        message: "Entered Password is Incorrect. Please try again!",
      });
    }

    const currentTimeInSeconds = Math.floor(new Date().getTime() / 1000);
    const expiryTimeInSeconds = currentTimeInSeconds + 3600;

    const jwtPayload = {
      userid: user._id,
      mobile: user.mobile,
      expiry: expiryTimeInSeconds,
    };
    const token = jwt.sign(jwtPayload, "MY_SECRETE_KEY");

    await UserModel.findByIdAndUpdate(user._id, { $set: { token } });

    res.json({
      status: true,
      message: "LoggedIn Successfully.",
      token: token,
    });
  } catch (error) {
    res.json({
      status: false,
      message: "Something Went Wrong. Please try again!",
      errorMessage: error,
    });
  }
};

const logout = async (req, res) => {
  try {
  } catch (error) {
    req.status(500).json({ message: error.message });
  }
};

const follow_unfollow = async (req, res) => {
  try {
    const { id } = req.params;
    const userToModify = await UserModel.findById(id);
    const currentUser = await UserModel.findById(req.user.id);

    if (id == req.user._id) {
      return req.status(400).json({
        message: "You cannot follow yourself",
      });
    }

    if (!userToModify || !currentUser)
      return res.status(400).json({ message: "User not found!" });

    const isFollowing = currentUser.following.includes(id);

    if (isFollowing) {
      //unfollow
      await UserModel.findByIdAndUpdate(req.user._id, {
        $pull: { following: id },
      });
      await UserModel.findByIdAndUpdate(id, {
        $pull: { followers: req.user._id },
      });

      res.json({status:  true,message: "user unfollow successfully"})
    } 
    else {
      // follow
      await UserModel.findByIdAndUpdate(req.user._id, {
        $push: { following: id },
      });
      await UserModel.findByIdAndUpdate(id, {
        $push: { followers: req.user._id },
      });
      res.json({status:  true,message: "user follow successfully"})
    
    }
  } catch (error) {
    req.status(500).json({ message: error.message });
  }
};

const updateUser = async (req, res)=>{
  const {name, email, username, password, profilepic, bio, address } = req.body
  try{
    let user = await UserModel.rfindById(req.params.id)
    if(!user) return res.status(400).json({message : "User not found!"})
    
    if(req.user._id.toString() !== req.params.id) return req.status(400).json({message : "You cannot update others user's profile."})


    if(password){
      const salt = bcrypt.genSalt(10)
      const hashPassword = await bcrypt.hash(password, salt)
      user.password = hashPassword
    }  

    user.name = name || user.name
    user.email = email || user.email
    user.username = username || user.username
    user.profilepic = profilepic || user.profilepic
    user.bio = bio || user.bio
    user.address = address || user.address
    
    user = await UserModel.save()

    res.status(400).json({message : "Successfully updated user info."})

  } catch (error) {
    req.status(500).json({ message: error.message });
  }
}

const getUserProfile = async (req, res)=>{
  const {username} = req.params
  try{
    const user = await UserModel.findOne({username}).select("-password").select("-updatedAt");
    if(!user) return res.status(400).json({message : "User not found!"})
    
      res.status(200).json({message: "Successfully found user", result : user})
  
  
  }
  catch (error) {
    req.status(500).json({ message: error.message });
  }
}


const userController = {
  signup,
  signin,
  logout,
  follow_unfollow,
  updateUser,
  getUserProfile
};

module.exports = userController;
