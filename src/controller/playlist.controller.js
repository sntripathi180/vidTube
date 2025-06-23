import mongoose, { Schema } from "mongoose";
import { Playlist } from "../models/playlist.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createPlaylist = asyncHandler(async (req, res) => {
  const { name, description } = req.body;

  if (!name) {
    throw new ApiError(400, "Name is required");
  }
  if (!description) {
    throw new ApiError(400, "Description is required");
  }
  const playlist = await Playlist.create({
    name,
    description,
  });
  if (!playlist) {
    throw new ApiError(500, "something went wrong while creating playlist");
  }

  playlist.owner = req.user?._id;
  await playlist.save();
  return res
    .status(200)
    .json(new ApiResponse(200, playlist, "Playlist created successfully"));
});

const addVideos = asyncHandler(async (req, res) => {
  const { videoId, playlistId } = req.params;
  if (!videoId || !playlistId) {
    throw new ApiError(400, "VideoId or PlaylistId is missing");
  }
  const playlist = await Playlist.findById(playlistId);
  if (!playlist) {
    throw new ApiError(404, "Playlist not found ");
  }

  if (!playlist?.videos?.includes(videoId)) {
    playlist.videos.push(videoId);
    await playlist.save();
  }

  return res
    .status(200)
    .json(new ApiResponse(200, playlist, "Video added successfully"));
});

const getPlaylist = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;
  if (!playlistId) {
    throw new ApiError(400, "PlaylistId is missing");
  }

  const playlist = await Playlist.aggregate([
    {
      $match: { _id: new mongoose.Types.ObjectId(playlistId) },
    },
    {
      $lookup: {
        from: "videos",
        localField: "videos",
        foreignField: "_id",
        as: "videos",
      },
    },
  ]);

  if (!playlist?.length) {
    throw new ApiError(404, "Playlist not found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, playlist, "Playlist fetched successfully"));
});

const getUserPlaylist = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    throw new ApiError(400, "User id is missing");
  }
  const playlist = await Playlist.aggregate([
    {
      $match: { owner: new mongoose.Types.ObjectId(`${userId}`) },
    },
    {
      $lookup: {
        from: "videos",
        localField: "videos",
        foreignField: "_id",
        as: "videos",
      },
    },
  ]);

  if (!playlist?.length) {
    throw new ApiError(404, "Playlist not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, playlist, "Playlist fetched successfully!!"));
});

const deletePlaylist = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;

  if (!playlistId) {
    throw new ApiError(400, "PlaylistId not found");
  }

  const playlist = await Playlist.findByIdAndDelete(playlistId);

  if (!playlist) {
    throw new ApiError(400, "Playlist not found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, playlist, "Playlist delted successfully"));
});

const updatePlaylist = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;
  if (!playlistId) {
    throw new ApiError(400, "Playlist id is missing");
  }

  const { name, description } = req.body;
  if (!name) {
    throw new ApiError(400, "Name is required");
  }
  const playlist = await Playlist.findByIdAndUpdate(
    playlistId,
    {
      $set: {
        name,
        description: description || "",
      },
    },
    {
      new: true,
    }
  );

  if (!playlist) {
    throw new ApiError(404, "Playlist not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, playlist, "Playlist updated successfully !!"));
});

const removePlaylistVideo = asyncHandler(async (req, res) => {
  const { playlistId, videoId } = req.params;

  if (!videoId || !playlistId) {
    throw new ApiError(400, "PlaylistId or videoId is missing");
  }

  const playlist = await Playlist.findById(playlistId);

  playlist.videos = playlist.videos.filter((item) => item != videoId);
  await playlist.save();

  return res
    .status(200)
    .json(new ApiResponse(200, playlist, "Video removed successfully"));
});

export {
  createPlaylist,
  addVideos,
  getPlaylist,
  getUserPlaylist,
  deletePlaylist,
  updatePlaylist,
  removePlaylistVideo,
};
