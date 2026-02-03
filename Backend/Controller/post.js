const PostModel = require('../Model/post')
const UserModel = require('../Model/user')
const cloudinary = require('../config/cloudinary');

const createPost = async (req, res)=> {
    const { text} = req.body

    try {
    const userId = req.user._id;

     if (!text)
      return res.status(400).json({ message: "Text is required" });

    if(text.length > 500) return res.status(400).json({message : "Text must be less than 500 characters"})
    
    let imageUrl = "";

    if(!req.file) return res.status(400).json({ message: "Image is required" });

    if(req.file){
        // console.log("line 23")
        const uploadedImage = await cloudinary.uploader.upload(req.file.path, {folder: "posts"});
        console.log("CLOUDINARY RESPONSE:", uploadedImage);
        imageUrl = uploadedImage.secure_url;
    }

    const user = await UserModel.findById(userId)
    const newPost = await PostModel.create({
        postedBy : userId,
        text : text,
        image : imageUrl,
        username : user.username
    })
    
    res.status(200).json({message : "Post Created Successfully.", result : newPost})
    }
    catch (error) {
        res.status(500).json({ message: error.message,error });
      }
}

// in future
const updatePost = async (req, res)=> {
    try {
        // const post = await PostModel.findOne({req.params.postId})
        // console.log("Update Post");
    }
    catch (error) {
        res.status(500).json({ message: error.message });
      }
}

const getPost = async (req, res)=>{
const {postId} = req.params
try{
    const post = await PostModel.findById({_id:postId})
    if(!post) return res.status(400).json({message : "Post not found!"})
    res.status(200).json({message : "Post", result : post})
}
catch (error) {
    res.status(500).json({ message: error.message });
  }
}

const  deletePost = async (req, res)=>{
    const {postId} = req.params;
    try{
        const post = await PostModel.findOne({_id:postId, isDeleted:false});
        console.log("Post :", post)
        if(!post) return res.status(400).json({message : "Post id is incorrect!"})
        
        if(post.postedBy.toString() !== req.user._id.toString()) return res.status(403).json({message : "Unauthorised to delete!"})
        console.log("post.postedBy", post.postedBy.toString());
        console.log("req.user._id", req.user._id.toString());

        post.isDeleted = true;
        
        await post.save();

        res.status(200).json({message : "Post Successfully Deleted"})
    }
    catch (error) {
        res.status(500).json({ message: error.message });
      }
}

const likePost = async (req, res)=>{
    const postId  = req.params.postId

    try{
        const post = await PostModel.findOne({_id:postId})

        if(!post) return res.status(400).json({message : "Post not found!"})
        
        const userLikedPost = post.likes.includes(req.user._id)
        
        if(userLikedPost){
            // unlike
            const updatedUser = await PostModel.findByIdAndUpdate(postId, {$pull : {likes : req.user._id}}, {new:true})
            res.status(200).json({suceess:true, message : "Post unliked Successfully.", user:updatedUser})
        }
        else{
            // like
            const updatedUser = await PostModel.findByIdAndUpdate(postId, {$push : {likes : req.user._id}},{ new: true})
            res.status(200).json({suceess:true, message : "Post liked Successfully.", user:updatedUser})
        }
        
        // res.status(200).json({message : "Post liked Successfully", result : post})
    }
    catch (error) {
        res.status(500).json({ message: error.message });
      }
}

// in future
const replyToPost = async (req, res)=>{
    const { postId } = req.params
    try{
        const post = await PostModel.findById(postId)
        
        if(!post) return res.status(400).json({message : "Post not found!"})
        
        const reply ={ 
            userId : req.user._id ,
            text: req.body.reply,
            userProfilePic : req.user.profilepic,
            username:  req.user.username
        }

        post.replies.push(reply)

        await post.save()

        res.status(200).json({message : "Reply successfully added", result : reply})

    }
    catch(error){
                res.status(500).json({ message: error.message });
            }
}    

const getFeedPosts = async (req, res)=>{
    try{
        const userId = req.user.id
        // console.log("_id",userId);
        const user = await UserModel.findById(userId)
        // console.log(user)
        if(!user) return res.status(404).json({message : "User not found!"})
        
        const following = user.following

        const feedPosts = await PostModel.find({postedBy : {$in : following}}).sort({createdBy: -1})
        // console.log("feedPost", feedPosts);
        res.status(200).json({ message: "feed Get Successfully", result : feedPosts });
    }
    catch(error){
        res.status(500).json({ message: error.message });
    }
}
const feedPosts = async(req, res)=>{
    const search = req.query.search || '';
    const sort = req.query.sort || 'asc';
    const limit = req.query.limit || 20;
    const page = req.query.page || 1;

    try{
    const [total, posts] = await Promise.all([PostModel.countDocuments({isDeleted: false},{title: { $regex: search, $options: "i" }}) ,
                    PostModel.find({isDeleted:false, text: {$regex : search, $options: 'i'}})
                    .sort({createdAt: sort=='desc'?-1:1})
                    .limit(limit)
                    .skip((page-1)*limit)])
                    
    if(!posts){
        res.status().json({
            status: false,
            message: "Not found"
        })
    }

    res.status(200).json({
        status: true,
        message: "Latest Posts Successfully fetched",
        count: posts.length,
        total,
        data: posts
    })

    }catch(error){
        console.log("error", error);
        
    }        
}


const postController = {
    createPost,
    updatePost ,
    getPost,
    deletePost,
    likePost,
    replyToPost,
    getFeedPosts,
    feedPosts

}

module.exports = postController