

const postComment = async (req, res)=>{
    try{

    }
    catch(error){
        res.json({
            status: false,
            message: "Something Went Wrong. Please try again!",
            errorMessage: error,
          });
    }
}
const getComment = async (Req,res)=>{
    try{

    }
    catch(error){
        res.json({
            status: false,
            message: "Something Went Wrong. Please try again!",
            errorMessage: error,
          });
    }
}
const commentController = {
    postComment,
    getComment
}
module.exports = commentController