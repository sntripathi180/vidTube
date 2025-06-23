import {Router} from "express";
import {verifyJWT} from "../middlewares/auth.middlewares.js"
import { createCommunityPost, deletePost, getAllCommunityPost, getChannelPost, updatePost } from "../controller/community.controller.js";

const router = Router();

router.use(verifyJWT)

router.route("/").post(createCommunityPost)
router.route("/all-post").get(getAllCommunityPost)
router.route("/channel-post/:channelId").get(getChannelPost)
router.route("/delete-post/:postId").delete(deletePost)
router.route("/update-post/:postId").put(updatePost)

export default router;