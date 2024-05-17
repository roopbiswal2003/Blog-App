
//import model
 
const Post=require("../models/postModel");
const Like= require("../models/likeModel");

//business logic

exports.likePost = async (req,res) => {
    try{
        //fetch data from req body
        const {post,user} = req.body;

        //create a comment object
        const like=new Like({
            post,user,body
        });

//save the new comment into the database
const savedLike =await like.save();

//find the post by ID,add the new comments to its comment array
const updatedPost= await Post.findByIdAndUpdate(post,{push:{likes: savedLike._id}},{new: true})
.populate("comments") //populate the comments array with comment documents
.exec();

res.json({
    post:updatedPost,
});

    }
catch(error) {
    return res.status(400).json({
        error:"Error while creating comment",
    });
}

}

//unlike a post
exports.unlikePost= async (req,res) => {
    try{
        const{post,like} =req.body;
        //find and delete the like collection
        const deletedLike = await Like.findOneAndDelete({post:post,_id:like});

        //update amd post collection
        const updatedPost = await Post.findByIdAndUpdate(post,{$pull: {likes:deletedLike._id}} ,{new: true});

        res.json({
            post:updatedPost,
    });

 }

 catch(error) {
        return res.status(400).json({
            error:"Error while creating comment",
        });
    }
}
  


exports.dummyLink=(req,res) => {
    res.send("This is your dummy page");
}