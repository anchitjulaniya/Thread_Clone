const PostModel = require('../Model/post')
const createPost = async (req, res)=> {
    const {postedBy, text, img} = req.body
    try {

    if(!postedBy || !text) return req.status(400).json({message : "PostedBy and text fields are required"})
    
    if(text.length > 500) return req.status(400).json({message : "Text mut be less than 500 characters"})
    
    const newPost = await PostModel.create({
        postedBy : postedBy,
        text : text,
        image : img
    })

    res.status(200).json({message : "Post Created Successfully.", result : newPost})
    }
    catch (error) {
        req.status(500).json({ message: error.message });
      }
}

const updatePost = async (req, res)=> {
    try {
        // const post = await PostModel.findOne({req.params.postId})
        console.log("Update Post");
    }
    catch (error) {
        req.status(500).json({ message: error.message });
      }
}

const getPost = async (req, res)=>{
const {postId} = res.params
try{
    const post = await PostModel.findById(postId)
    if(!post) return req.status(400).json({message : "Post not found!"})
    res.status(200).json({message : "Post", result : post})
}
catch (error) {
    req.status(500).json({ message: error.message });
  }
}

const  deletePost = async (req, res)=>{
    const {postId} = res.params
    try{
        const post = await PostModel.findByIdAndDelete(postId)

        if(!post) return req.status(400).json({message : "Post id is incorrect!"})
        
        if(postId !== req.user._id) return req.status(400).json({message : "Unauthorised to delete!"})
        
        res.status(200).json({message : "Post Successfully Deleted", result : post})
    }
    catch (error) {
        req.status(500).json({ message: error.message });
      }
}

const likePost = async (req, res)=>{
    const {postId} = res.params
    try{
        const post = await PostModel.findById(postId)
        if(!post) return req.status(400).json({message : "Post not found!"})
        
        const userLikedPost = post.likes.includes(req.user._id)
        if(userLikedPost){
            // unlike
            await PostModel.findByIdAndUpdate(postId, {$pull : {likes : user.req._id}})
            res.status(200).json({message : "Post unliked Successfully."})
        }
        else{
            // like
            await PostModel.findByIdAndUpdate(postId, {$push : {likes : user.req._id}})
            res.status(200).json({message : "Post liked Successfully."})
        }
        
        res.status(200).json({message : "Post liked Successfully", result : post})
    }
    catch (error) {
        req.status(500).json({ message: error.message });
      }
}

const replyToPost = async (req, res)=>{
    const { postId } = req.params
    try{
        const post = await PostModel.findById(postId)
        
        if(!post) return req.status(400).json({message : "Post not found!"})
        
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
                req.status(500).json({ message: error.message });
            }
}    

const getFeedPosts = async (req, res)=>{
    try{
        const userId = req.user._id
        
        const user = await UserModel.findById(userId)
        if(!user) return req.status(404).json({message : "User not found!"})
        
        const following = user.following

        const feedPosts = await PostModel.find({postedBy : {$in : following}}).sort({createdBy: -1})

        req.status(200).json({ message: "Get feed Successfully" });
    }
    catch(error){
        req.status(500).json({ message: error.message });
    }
}

const postController = {
    createPost,
    updatePost ,
    getPost,
    deletePost,
    likePost,
    replyToPost,
    getFeedPosts

}

module.exports = postController