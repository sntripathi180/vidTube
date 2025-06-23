import {Router} from "express";
import {verifyJWT} from "../middlewares/auth.middlewares.js"
import { addComment, deleteComment, getAllVideoComments, updateComment } from "../controller/comment.controller.js";


const router = Router();

router.route("/create/:channelId/:videoId").post(verifyJWT,addComment);

router.route("/vid-comments/:videoId").get(verifyJWT,getAllVideoComments)

router.route("/delete-comment/:commentId").delete(verifyJWT,deleteComment)

router.route("/update-comment/:commentId").put(verifyJWT,updateComment);

export default router;