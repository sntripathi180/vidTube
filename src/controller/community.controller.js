import mongoose from "mongoose";
import { Community } from "../models/community.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const createCommunityPost = asyncHandler(async (req, res) => {
  const { content } = req.body;

  if (!content) {
    throw new ApiError(400, "Write something to post ");
  }

  const community = await Community.create({
    content,
    owner: req.user._id,
  });
  if (!community) {
    throw new ApiError(400, "Error while creating community post");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, community, "Community post created successfully")
    );
});

const getAllCommunityPost = asyncHandler(async (req, res) => {
  const communityPost = await Community.aggregate([
    { $match: {} },
    {
      $lookup: {
        from: "users",
        localField: "owner",
        foreignField: "_id",
        as: "owner",
        pipeline: [
          {
            $project: {
              username: 1,
              fullname: 1,
              avatar: 1,
            },
          },
        ],
      },
    },
  ]);

  if (!communityPost) {
    throw new ApiError(400, "error while fetching posts");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, communityPost, "All post fetched"));
});

const getChannelPost = asyncHandler(async (req, res) => {
  const { channelId } = req.params;
  if (!channelId) {
    throw new ApiError(400, "Channel id is missing");
  }

  const post = await Community.aggregate([
    {
      $match: { owner: new mongoose.Types.ObjectId(`${channelId}`) },
    },
  ]);

  if (!post) {
    throw new ApiError(404, "post not found");
  }

  return res.status(200).json(new ApiResponse(200, post, "Post fetched"));
});

const deletePost = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const deletedPost = await Community.findByIdAndDelete(postId);

  if (!deletedPost) {
    throw new ApiError(400, "error while deleting post");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, deletedPost, "Post deleted"));
});

const updatePost = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const { content } = req.body;
  if (!postId) {
    throw new ApiError(400, "Post id is missing");
  }
  if (!content) {
    throw new ApiError(400, "Write something to update");
  }
  const updatedPost = await Community.findByIdAndUpdate(
    postId,
    {
      $set: {
        content,
      },
    },
    {
      new: true,
    }
  );
  if (!updatedPost) {
    throw new ApiError(400, "Post not found ,update failed");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updatedPost, "Post updated successfully!!"));
});

export {
  createCommunityPost,
  getAllCommunityPost,
  getChannelPost,
  deletePost,
  updatePost,
};
