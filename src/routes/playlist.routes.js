import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import {
  addVideos,
  createPlaylist,
  deletePlaylist,
  getPlaylist,
  getUserPlaylist,
  removePlaylistVideo,
  updatePlaylist,
} from "../controller/playlist.controller.js";


const router = Router();

router.route("/").post(verifyJWT, createPlaylist);
router.route("/add-videos/:playlistId/:videoId").put(verifyJWT, addVideos);
router.route("/get-playlist/:playlistId").get(verifyJWT, getPlaylist);
router.route("/get-user-playlist/:userId").get(verifyJWT, getUserPlaylist);
router.route("/delete-playlist/:playlistId").delete(verifyJWT, deletePlaylist);
router.route("/update-playlist/:playlistId").put(verifyJWT, updatePlaylist);
router
  .route("/remove-video/:playlistId/:videoId")
  .delete(verifyJWT, removePlaylistVideo);

export default router;
