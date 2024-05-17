const express=require ("express");
const router=express.Router();  

//Import controllers
const {dummyLink,likePost,unlikePost} =require("../controllers/LikeController");
const {createComment} =require("../controllers/CommentController");
const {createPost,getAllPosts} =require("../controllers/PostController");


 

//Mapping Create
router.get("/dummyroute",dummyLink);
router.post("/comments/create",createComment);
router.post("/post/create",createPost);
router.get("post",getAllPosts); 
router.post("/likes/like",likePost);
router.post("/likes/unlike",unlikePost);






//Export
module.exports = router;