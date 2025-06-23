import {Router } from "express";
import { verifyJWT } from "../middlewares/auth.middlewares.js"
import { getAllLikedVideos, toggleCommentLike, toggleCommunityPostLike, toggleVideoLike } from "../controller/like.controller.js";

const router =  Router();

router.use(verifyJWT);

router.route("/vid-like/:videoId").post(toggleVideoLike);
router.route("/comment-like/:commentId").post(toggleCommentLike)
router.route("/post-like/:postId").post(toggleCommunityPostLike)
router.route("/get-liked-vid").get(getAllLikedVideos)

export default router;