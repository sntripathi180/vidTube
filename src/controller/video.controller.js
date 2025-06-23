import {asyncHandler} from "../utils/asyncHandler.js";
import { Video } from "../models/video.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const getAllVideos = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query;

  let sortCriteria = {};
  let videoQuery = {};

  if (userId) {
    videoQuery.userId = userId;
  }
  if (query) {
    videoQuery.$or = [
      {
        title: {
          $regex: query,
          $options: "i",
        },
      },
      {
        description: {
          $regex: query,
          $options: "i",
        },
      },
    ];
  }

  if (sortBy && sortType) {
    sortCriteria[sortBy] = sortType === "desc" ? -1 : 1;
  }

  const videos = await Video.find(videoQuery)
    .sort(sortCriteria)
    .skip((page - 1) * limit)
    .limit(limit);

  if (!videos) {
    throw new ApiError(400, "error while fetching all videos");
  }

  return res.status(200).json(new ApiResponse(200, videos, "Videos fetched"));
});

const publishVideo = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  const videoLocalPath = req.files?.videoFile[0]?.path;
  const thumbnailocalPath = req.files.thumbnail[0].path;

  if (!title) {
    throw new ApiError(400, "title is missing");
  }
  if (!thumbnailocalPath) {
    throw new ApiError(400, "Thumbnail is not uploaded");
  }

  if (!videoLocalPath) {
    throw new ApiError(400, "Video is missing");
  }

  const publishedThumbnail = await uploadOnCloudinary(thumbnailocalPath);
  const publishedVideo = await uploadOnCloudinary(videoLocalPath);

  if (!publishedVideo) {
    throw new ApiError(500, "Error while uploading video");
  }

  if (!publishedThumbnail) {
    throw new ApiError(500, "Error while uploading thumbnail");
  }

  const video = await Video.create({
    title,
    description: description || "",
    thumbnail: publishedThumbnail.url,
    videoFile: publishedVideo.url,
    duration: publishedVideo?.duration || 0,
  });
  console.log("Uploaded video metadata:", publishedVideo);


  video.owner = req.user?._id;
  video.save();
  console.log(video);

  return res
    .status(200)
    .json(new ApiResponse(200, video, "Video uploaded successfully"));
});

const getVideoById = asyncHandler(async (req, res) => {
  const { videoId } = req.params;

  if (!videoId) {
    throw new ApiError(400, "Video id is missing ");
  }

  const video = await Video.findById(videoId);

  if (!video) {
    throw new ApiError(500, "Error while fetching video");
  }

  return res.status(200).json(new ApiResponse(200, video, "Video fetched"));
});

const updateVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  const { title, description } = req.body;

  if (!videoId) {
    throw new ApiError(400, "Video id is missing");
  }

  if (!title && !description) {
    throw new ApiError(400, "Title and Description are required");
  }

  const thumbnaiLocalPath = req.file?.path;
  if (!thumbnaiLocalPath) {
    throw new ApiError(400, "Thumbnail file is missing");
  }

  const thumbnail = await uploadOnCloudinary(thumbnaiLocalPath);

  if (!thumbnail) {
    throw new ApiError(400, "Thumbnail uplaod failed");
  }

  const video = await Video.findByIdAndUpdate(
    videoId,
    {
      $set: {
        title,
        description,
        thumbnail: thumbnail?.url,
      },
    },
    {
      new: true,
    }
  );

  if (!video) {
    throw new ApiError(500, "Error while updating video");
  }

  return res.status(200).json(new ApiResponse(200, video, "Updated"));
});

const deleteVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  if (!videoId) {
    throw new ApiError(400, "Video Id is missing");
  }

  await Video.findByIdAndDelete(videoId);

  return res.status(200).json(
    new ApiResponse(
      200,
      {},

      "Video deleted successfully"
    )
  );
});

const toggleIsPublished = asyncHandler(async (req, res) => {
  const { videoId } = req.params;

  if (!videoId) {
    throw new ApiError(400, "Video id is missing");
  }

  const video = await Video.findById(videoId);

  if (!video) {
    throw new ApiError(404, "Video not found");
  }

  video.isPublished = !video.isPublished;

  await video.save();

  return res.json(new ApiResponse(200, video, "Updated"));
});

export {
  getAllVideos,
  publishVideo,
  getVideoById,
  updateVideo,
  deleteVideo,
  toggleIsPublished,
};
