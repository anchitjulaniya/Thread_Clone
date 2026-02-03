const UserModel = require('./Model/user');
const PostModel = require('./Model/post');


const migration = async (req, res) => {
    try{
        // const Users = await UserModel.updateMany({stories: {$exists:false}},{$set:{stories:[]}});
        // console.log('done')
        // res.status(200).json({
        //     status: true,
        //     count: Users.length   })

        // const Users = await UserModel.updateMany({isDeleted: {$exists: false}}, {$set: {isDeleted: false}});

        const Posts = await PostModel.updateMany({isDeleted: {$exists: false}}, {$set: {isDeleted: false}});
        res.status(200).json({
            status : true,
            Posts
        })
    }catch(error){
        console.log(error);
        console.error("error", error);
    }
}

// const 

module.exports = migration;