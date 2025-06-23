import { Router } from "express";
import {
  deleteVideo,
  getAllVideos,
  getVideoById,
  publishVideo,
  toggleIsPublished,
  updateVideo,
} from "../controller/video.controller.js";
import { upload } from "../middlewares/multer.middlewares.js";
import { verifyJWT } from "../middlewares/auth.middlewares.js";

const router = Router();
router.route("/").get(getAllVideos);


router
  .route("/publish-video")
  .post(
    verifyJWT,
    upload.fields([
      { name: "thumbnail",maxCount:1 },
      { name: "videoFile", maxCount: 1 },
    ]),
    publishVideo
  );

router.route("/vid/:videoId").get(getVideoById);

router
  .route("/update-video/:videoId")
  .put(verifyJWT, upload.single("thumbnail"), updateVideo);

router.route("/delete/:videoId").delete(verifyJWT, deleteVideo);

router.route("/publish-status/:videoId").patch(verifyJWT, toggleIsPublished);

export default router;
