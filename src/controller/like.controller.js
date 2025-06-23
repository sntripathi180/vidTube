import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Like } from "../models/like.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const toggleVideoLike = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  if (!videoId) {
    throw new ApiError(400, "Video id is missing");
  }
  const isLiked = await Like.findOne({
    video: videoId,
    likedBy: req.user._id,
  });
  if (!isLiked) {
    const like = await Like.create({
      video: videoId,
      likedBy: req.user._id,
    });
    if (!like) {
      throw new ApiError(400, "Error while liking");
    }
  } else {
    await Like.findByIdAndDelete(isLiked._id);
  }

  const videoLiked = await Like.findOne({
    video: videoId,
    likedBy: req.user._id,
  });

  let isVideoLiked;

  if (!videoLiked) {
    isVideoLiked = false;
  } else {
    isVideoLiked = true;
  }

  return res
    .status(200)
    .json(new ApiResponse(200, { isVideoLiked }, "Video liked"));
});

const toggleCommentLike = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  if (!commentId) {
    throw new ApiError(400, "Comment id is missing ");
  }
  const isLiked = await Like.findOne({
    comment: commentId,
    likedBy: req.user._id,
  });

  if (!isLiked) {
    const like = await Like.create({
      comment: commentId,
      likedBy: req.user._id,
    });

    if (!like) {
      throw new ApiError(400, "Error while liking comment");
    }
  } else {
    await Like.findByIdAndDelete(isLiked._id);
  }

  const commentLiked = await Like.findOne({
    comment: commentId,
    likedBy: req.user._id,
  });

  let isCommentLiked;
  if (!commentLiked) {
    isCommentLiked = false;
  } else {
    isCommentLiked = true;
  }

  return res
    .status(200)
    .json(new ApiResponse(200, { isCommentLiked }, "Comment Like Status"));
});

const toggleCommunityPostLike = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  if (!postId) {
    throw new ApiError(400, "Post id is missing");
  }
  const isLiked = await Like.findOne({
    community: postId,
    likedBy: req.user._id,
  });

  if (!isLiked) {
    const likedPost = await Like.create({
      community: postId,
      likedBy: req.user._id,
    });
    if (!likedPost) {
      throw new ApiError(400, "Error while liking post");
    }
  } else {
    await Like.findByIdAndDelete(isLiked._id);
  }

  const like = await Like.findOne({
    community: postId,
    likedBy: req.user._id,
  });

  let isCommunityLiked;

  if (!like) {
    isCommunityLiked = false;
  } else {
    isCommunityLiked = true;
  }

  return res
    .status(200)
    .json(new ApiResponse(200, { isCommunityLiked }, "Community like Status"));
});

const getAllLikedVideos = asyncHandler(async (req, res) => {
  const likedVideos = await Like.find({
    likedBy: req.user._id,
    video: { $ne: null },
  }).populate("video");

  if (!likedVideos) {
    throw new ApiError(400, "Error while fetching liked videos");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, likedVideos, "Liked videos fetched"));
});

export {
  toggleVideoLike,
  toggleCommentLike,
  toggleCommunityPostLike,
  getAllLikedVideos,
};
