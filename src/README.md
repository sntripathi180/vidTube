#  VidTube Backend

A YouTube-like backend built using **Node.js**, **Express.js**, **MongoDB**, **Cloudinary**, and **Multer**. This project handles user authentication using **JWT**, video uploads, playlists, likes, community posts, and comments.


---

##  Features

###  User Management
- User registration and login with avatar and cover image upload.
- Secure authentication using JWT access and refresh tokens.
- Update user profile, change password, and logout.
- Fetch current user info and user channels.

###  Video Management
- Upload, update, publish/unpublish, and delete videos.
- Store video and thumbnail on Cloudinary.
- Fetch all or individual videos.

###  Subscriptions
- Subscribe/unsubscribe to channels.
- View channel subscribers and user subscriptions.

###  Playlists
- Create and manage video playlists.
- Add or remove videos from a playlist.

###  Likes
- Like or unlike videos, comments, and community posts.
- Fetch all liked videos.

###  Comments
- Add, update, and delete comments on videos.
- Fetch all comments for a video.

###  Community Posts
- Create, update, and delete community posts.
- Fetch posts by channel or get all posts.

---

##  Installation

### 1. Clone the Repository

    git clone https://github.com/sntripathi180/vidTube.git
    cd vidtube-backend

### 2. Install Dependencies

    npm install

### 3. Set up Environment Variables
    Create a .env file in the root directory:


### 4. Run the Development Server

    npm run dev

## Table of Contents

- [Healthcheck Endpoint](#healthcheck-endpoint)
- [User Endpoints](#user-endpoints)
- [Videos Endpoints](#videos-endpoints)
- [Comment Endpoints](#comment-endpoints)
- [Subscription Endpoints](#subscription-endpoints)
- [Community Endpoints](#community-endpoints)
- [Like Endpoints](#like-endpoints)
- [Playlist Endpoints](#playlist-endpoints)

##  Base URL
http://localhost:3000/api/v1


# Healthcheck Endpoint

- Endpoint: /healthcheck
- Method: GET
- Description:  
  This endpoint is used to check if the server is running and healthy. It is typically used by monitoring tools or load balancers to verify that the backend service is operational.

### Example Response:

    {
        "statusCode": 200,
        "data": "OK",
        "message": "Health check passed",
        "success": true
    }

# Comment Endpoints

## Add Comment Endpoint Documentation

- Endpoint: /comment/create/:channelId/:videoId
- Method: POST
- Description:  
  This endpoint allows an authenticated user to add a comment to a specific video on a channel. The user must be logged in (JWT token required).

🔸 URL Params:

    channelId (string) — ID of the channel that owns the video.

    videoId (string) — ID of the video being commented on.

- Request Body:

        {
        "content": "string (required, min length: 1)"
        }

### Example Response:

    {
        "statusCode": 200,
        "data": {
            "content": "hello this is my first commnet hit a like",
            "video": "68f0",
            "owner": "6892",
            "_id": "6853c",
            "createdAt": "2025-06-22T17:43:23.925Z",
            "updatedAt": "2025-06-22T17:43:23.925Z",
            "__v": 0
        },
        "message": "comment added successfully",
        "success": true
    }

---

## Get All Comments for Video Endpoint Documentation

- Endpoint: /comment/vid-comments/:videoId

- Method: GET

- Description:  
  Fetch all comments associated with a specific video. The user must be authenticated.

🔸 URL Params:

        videoId (string) — ID of the video to fetch comments for.

### Example Response:

        {
        "statusCode": 200,
        "data": [
           
            {
                "_id": "683f",
                "content": "hello this is my first commnet hit a like 1",
                "video": "685f0",
                "owner": [
                    {
                        "_id": "6892",
                        "username": "one112243",
                        "avatar": "/image/upload/v1eats.png"
                    }
                ],
                "createdAt": "2025-06-22T17:44:08.879Z",
                "updatedAt": "2025-06-22T17:44:08.879Z",
                "__v": 0
            },
            {
                "_id": "685842",
                "content": "hello this is my first commnet hit a like 2",
                "video": "68f0",
                "owner": [
                    {
                        "_id": "692",
                        "username": "one112243",
                        "avatar": "/image/upload/v1eats.png"
                    }
                ],
                "createdAt": "2025-06-22T17:44:16.214Z",
                "updatedAt": "2025-06-22T17:44:16.214Z",
                "__v": 0
            }
        ],
        "message": "Comments fetched successfully",
        "success": true
    }

---

## Delete Comment Endpoint Documentation

- Endpoint: /comment/delete-comment/:commentId

- Method: DELETE

- Description:  
  Allows the authenticated user to delete a comment by its ID. The user must be the comment owner or have admin privileges.

🔸 URL Params:

        commentId (string) — ID of the comment to delete.

### Example Response:

        {
        "statusCode": 200,
        "data": {
            "_id": "683c",
            "content": "hello this is my first commnet hit a like",
            "video": "68f0",
            "owner": "68d92",
            "createdAt": "2025-06-22T17:43:23.925Z",
            "updatedAt": "2025-06-22T17:43:23.925Z",
            "__v": 0
        },
        "message": "Comment deleted successfully",
        "success": true
    }

---

## Update Comment Endpoint Documentation

- Endpoint: /comment/update-comment/:commentId

- Method: PUT

- Description:  
  Allows the authenticated user to update the content of an existing comment by its ID. Only the comment author can update the comment.

🔸 URL Params:

    commentId (string) — ID of the comment to update.

- Request Body:

        {
        "content": "string (required, min length: 1)"
        }

### Example Response:

       {
        "statusCode": 200,
        "data": {
            "_id": "6843f",
            "content": "i have updated the comment now like",
            "video": "68f0",
            "owner": "6892",
            "createdAt": "2025-06-22T17:44:08.879Z",
            "updatedAt": "2025-06-22T17:51:42.202Z",
            "__v": 0
        },
        "message": "Comment updated successfully",
        "success": true
    }

---
# Community Endpoints

## Create Community Post Endpoint Documentation

- Endpoint: /community
- Method: POST
- Description:  
  This endpoint allows an authenticated user to create a new community post. The post will be associated with the user's channel.

- Request Body:
    {
        "content" : "hello world this is  my first post"
    }
        

### Example Response:

        {
            "statusCode": 200,
            "data": {
                "content": "hello world this is  my first post",
                "owner": "6892",
                "_id": "698c",
                "createdAt": "2025-06-22T16:39:51.500Z",
                "updatedAt": "2025-06-22T16:39:51.500Z",
                "__v": 0
            },
            "message": "Community post created successfully",
            "success": true
        }
## Get All Community Posts Endpoint Documentation

- Endpoint: /community/all-post
- Method: GET
- Description:  
  Fetches all community posts across all channels. Requires authentication.

### Example Response:

        {
        "statusCode": 200,
        "data": [
            {
                "_id": "6898c",
                "content": "hello world this is  my first post",
                "owner": [
                    {
                        "_id": "68d92",
                        "username": "one112243",
                        "fullname": "new name",
                        "avatar": "/image/upload/v1ats.png"
                    }
                ],
                "createdAt": "2025-06-22T16:39:51.500Z",
                "updatedAt": "2025-06-22T16:39:51.500Z",
                "__v": 0
            }
        ],
        "message": "All post fetched",
        "success": true
    }

## Get Channel Posts Endpoint Documentation

- Endpoint: /community/channel-post/:channelId
- Method: GET
- Description:  
  Fetches all community posts created by a specific channel.

🔸 URL Params:

    channelId (string) — ID of the channel whose posts you want to retrieve.

### Example Response:

        {
        "statusCode": 200,
        "data": [
            {
                "_id": "688c",
                "content": "hello world this is  my first post",
                "owner": "6892",
                "createdAt": "2025-06-22T16:39:51.500Z",
                "updatedAt": "2025-06-22T16:39:51.500Z",
                "__v": 0
            }
        ],
        "message": "Post fetched",
        "success": true
    }


## Update Community Post Endpoint Documentation

- Endpoint: /community/update-post/:postId
- Method: PUT
- Description:  
  Allows the authenticated channel owner to update the content or media of a community post.

🔸 URL Params:

    postId (string) — ID of the post to update.

- Request Body:

       {
        "statusCode": 200,
        "data": {
            "_id": "6898c",
            "content": "updated content hello world",
            "owner": "682d92",
            "createdAt": "2025-06-22T16:39:51.500Z",
            "updatedAt": "2025-06-22T17:26:46.900Z",
            "__v": 0
        },
        "message": "Post updated successfully!!",
        "success": true
    }

### Example Response:

    {
    "success": true,
    "data": {
    "\_id": "postId",
    "content": "Updated post content!",
    "media": "https://example.com/updated-image.jpg"
    },
    "message": "Post updated successfully"
    }
  

## Delete Community Post Endpoint Documentation

- Endpoint: /community/delete-post/:postId
- Method: DELETE
- Description:  
  Allows the authenticated channel owner to delete one of their community posts by its ID.

🔸 URL Params:

    postId (string) — ID of the post to delete.

### Example Response:

    {
        "statusCode": 200,
        "data": {
            "_id": "687a",
            "content": "hello world this is  my first post 4",
            "owner": "6892",
            "createdAt": "2025-06-22T17:28:26.638Z",
            "updatedAt": "2025-06-22T17:28:26.638Z",
            "__v": 0
        },
        "message": "Post deleted",
        "success": true
    }

---

# Like Endpoints

## Toggle Like on Video Endpoint Documentation

    - Endpoint: /like/vid-like/:videoId
    - Method: PUT
    - Description:
    Toggles the like status for a specific video by the authenticated user. If the user has already liked the video, it will remove the like; otherwise, it will add the like.

🔸 URL Params:

    videoId (string): ID of the video to like or unlike.

### Example Response:

    {
        "statusCode": 200,
        "data": {
            "isVideoLiked": true
        },
        "message": "Video liked",
        "success": true
    }

## Toggle Like on Comment Endpoint Documentation

- Endpoint: /like/comment-like/:commentId
- Method: PUT
- Description:  
  Toggles the like status for a specific comment. Requires authentication.

🔸 URL Params:

    commentId (string): ID of the comment to like or unlike.

### Example Response:

    {
        "statusCode": 200,
        "data": {
            "isCommentLiked": true
        },
        "message": "Comment Like Status",
        "success": true
    }

## Toggle Like on Community Post Endpoint Documentation

- Endpoint: /like/post-like/:postId
- Method: PUT
- Description:  
  Toggles the like status for a community post. Requires authentication.

🔸 URL Params:

    postId (string): ID of the post to like or unlike.

### Example Response:

    {
        "statusCode": 200,
        "data": {
            "isCommunityLiked": false
        },
        "message": "Community like Status",
        "success": true
    }

## Get All Liked Videos Endpoint Documentation

- Endpoint: /like/get-liked-vid
- Method: GET
- Description:  
  Fetches all videos liked by the authenticated user.

### Example Response:

    {
        "statusCode": 200,
        "data": [
            {
                "_id": "683c",
                "video": {
                    "_id": "6850b",
                    "videoFile": "/video/upload/v1750582171/isd.mp4",
                    "thumbnail": "/image/upload/v1750582163/s4rk.png",
                    "description": "uploaing the first video",
                    "duration": 14.973292,
                    "views": 0,
                    "isPublished": false,
                    "createdAt": "2025-06-22T08:49:29.045Z",
                    "updatedAt": "2025-06-22T09:34:47.027Z",
                    "__v": 0,
                    "owner": "68592"
                },
                "likedBy": "6892",
                "createdAt": "2025-06-22T14:15:22.621Z",
                "updatedAt": "2025-06-22T14:15:22.621Z",
                "__v": 0
            }
        ],
        "message": "Liked videos fetched",
        "success": true
    }

---
# Playlist Endpoints

##  Create Playlist Endpoint 

- Endpoint: /playlist
- Method: POST
- Description:  
   Creates a new playlist for the authenticated user.

- Request Body:

        {
        "name": "string ",
        "description": "string ",
        
        }

### Example Response:

    {
        "statusCode": 200,
        "data": {
            "name": "myPlaylist",
            "description": "my favourite song",
            "videos": [],
            "_id": "6817",
            "createdAt": "2025-06-22T12:34:57.542Z",
            "updatedAt": "2025-06-22T12:34:57.586Z",
            "__v": 0,
            "owner": "6892"
        },
        "message": "Playlist created successfully",
        "success": true
    }

## Get a Playlist Endpoint Documentation

- Endpoint: /playlist/get-playlist/:playlistId
- Method: GET
- Description:  
  Retrieves a single playlist by its ID.

🔸 URL Params:

    playlistId (string): The ID of the playlist to fetch.

### Example Response:

      {
        "statusCode": 200,
        "data": [
            {
                "_id": "6817",
                "name": "myPlaylist",
                "description": "my favourite song",
                "videos": [/* array of video objects */],
                "createdAt": "2025-06-22T12:34:57.542Z",
                "updatedAt": "2025-06-22T12:34:57.586Z",
                "__v": 0,
                "owner": "6892"
            }
          ],
          "message": "Playlist fetched successfully",
          "success": true
      }

## Update Playlist Endpoint Documentation

- Endpoint: /playlist/update-playlist/:playlistId
- Method: PUT
- Description:  
  Updates the metadata of a playlist (title, description, or thumbnail).

🔸 URL Params:

    playlistId (string): The ID of the playlist to update.

- Request Body:

        {
        "name": "string ",
        "description": "string (optional)",
        
        }

### Example Response:

    {
        "statusCode": 200,
        "data": {
            "_id": "6817",
            "name": "updated name",
            "description": "updated description",
            "videos": [],
            "createdAt": "2025-06-22T12:34:57.542Z",
            "updatedAt": "2025-06-22T12:46:03.025Z",
            "__v": 0,
            "owner": "68592"
        },
        "message": "Playlist updated successfully !!",
        "success": true
    }

## Delete Playlist Endpoint Documentation

- Endpoint: /playlist/delete-playlist/:playlistId
- Method: DELETE
- Description:  
  Deletes the playlist by its ID.

🔸 URL Params:

    playlistId (string): The ID of the playlist to delete.

### Example Response:

    {
        "statusCode": 200,
        "data": {
            "_id": "6817",
            "name": "updated name",
            "description": "updated description",
            "videos": [
                "array of ids of videos"
            ],
            "createdAt": "2025-06-22T12:34:57.542Z",
            "updatedAt": "2025-06-22T13:21:10.566Z",
            "__v": 3,
            "owner": "6892"
        },
        "message": "Playlist delted successfully",
        "success": true
    }

## Add Video to Playlist Endpoint Documentation

- Endpoint: /playlist/add-videos/:playlistId/:videoId
- Method: PUT
- Description:  
  Adds a video to the specified playlist.

🔸 URL Params:

    playlistId (string): ID of the playlist.

    videoId (string): ID of the video to add.

### Example Response:

    {
        "statusCode": 200,
        "data": {
            "_id": "6817",
            "name": "updated name",
            "description": "updated description",
            "videos": [
                "68f0"
            ],
            "createdAt": "2025-06-22T12:34:57.542Z",
            "updatedAt": "2025-06-22T12:53:31.753Z",
            "__v": 1,
            "owner": "6892"
        },
        "message": "Video added successfully",
        "success": true
    }

## Remove Video from Playlist Endpoint Documentation

- Endpoint: /playlist/remove-video/:playlistId/:videoId
- Method: DELETE
- Description:  
  Removes a video from the specified playlist.

🔸 URL Params:

    playlistId (string): ID of the playlist.

    videoId (string): ID of the video to remove.

### Example Response:

    {
        "statusCode": 200,
        "data": {
            "_id": "6817",
            "name": "updated name",
            "description": "updated description",
            "videos": [
                "68b8"
            ],
            "createdAt": "2025-06-22T12:34:57.542Z",
            "updatedAt": "2025-06-22T13:21:10.566Z",
            "__v": 3,
            "owner": "6892"
        },
        "message": "Video removed successfully",
        "success": true
    }

## Get User's Playlists Endpoint Documentation

- Endpoint: /playlist/get-user-playlist/userId
- Method: GET
- Description:  
  Retrieves all playlists created by a specific user.

🔸 URL Params:

    userId (string): ID of the user whose playlists you want to fetch.

### Example Response:

    {
        "statusCode": 200,
        "data": [
            {
                "_id": "6817",
                "name": "updated name",
                "description": "updated description",
                "videos": [
                    {
                        "_id": "68f0",
                        "videoFile": "/video/upload/djswo.mp4",
                        "thumbnail": "/image/upload/vup.png",
                        "description": "uploaing the first video",
                        "duration": 0,
                        "views": 0,
                        "isPublished": true,
                        "createdAt": "2025-06-22T07:33:22.891Z",
                        "updatedAt": "2025-06-22T07:33:22.974Z",
                        "__v": 0,
                        "owner": "6892"
                    }
                ],
                "createdAt": "2025-06-22T12:34:57.542Z",
                "updatedAt": "2025-06-22T12:53:31.753Z",
                "__v": 1,
                "owner": "68d92"
            }
        ],
        "message": "Playlist fetched successfully!!",
        "success": true
    }

---
# Subscription Endpoints

## Toggle Subscription Endpoint Documentation

- Endpoint: /subs/:channelId
- Method: PUT
- Description:  
   Toggles the subscription status of the authenticated user to the specified channel.
  If the user is already subscribed, they will be unsubscribed; otherwise, a new subscription will be created.

🔸 URL Params:

    channelId (string): The ID of the channel to subscribe/unsubscribe to.

### Example Response:

    {
    "statusCode": 200,
    "data": {
        "isSubscribed": true
    },
    "message": "success",
    "success": true
    }

## Get Subscribers of a Channel Endpoint Documentation

- Endpoint: /subs/channel-subs/:channelId
- Method: GET
- Description:  
  Fetches a list of users who are subscribed to the given channel.

🔸 URL Params:

    channelId (string): The ID of the channel whose subscribers you want to retrieve.

### Example Response:

    {
    "statusCode": 200,
    "message": "Channel's subscribers fetched",
    "data": [
    {
    "_id": "68bbd",
    "subscriber": [
    {
    "_id": "6892",
    "username": "john_doe",
    "fullName": "John Doe",
    "avatar": "https://example.com/avatar.jpg"
    }
    ],
    "createdAt": "2025-06-21T09:35:12.531Z"
    },
    {
    "subscriber": [
    {
    "_id": "6892",
    "username": "jane_smith",
    "fullName": "Jane Smith",
    "avatar": "https://example.com/avatar2.jpg"
    }
    ],
    "createdAt": "2025-06-20T13:22:05.931Z"
    }
    ],
    "message": "Channel's subscribers fetched",
    "success": true
    }

## Get Subscribed Channels of a User Endpoint Documentation

- Endpoint: /subs/subscribed-channel/:userId
- Method: GET
- Description:  
  Returns all the channels that a user is subscribed to.

🔸 URL Params:

    userId (string): The ID of the user whose subscribed channels should be fetched.

### Example Response:

    {
    "success": true,
    "message": "Subscribed channels fetched successfully",
    "data": [
    {
    "channel": {
    "_id": "channelId1",
    "name": "Tech Insights",
    "avatar": "https://example.com/tech.png"
    },
    "subscribedAt": "2025-06-21T10:00:00.000Z"
    },
    {
    "channel": {
    "_id": "channelId2",
    "name": "Code Daily",
    "avatar": "https://example.com/code.png"
    },
    "subscribedAt": "2025-06-18T15:30:00.000Z"
    }
    ]
    }

#  User Endpoints

## Registration

- Endpoint: /users/register
- Method: POST
- Description:  
   Registers a new user with optional avatar and cover image uploads.

- Request Body (multipart/form-data):

        username : String,
        email : email,
        password : alphaNumeric,
        avatar : image,
        coverImage : Image,
        fullname : {
            String String   
        }

### Example Response:

        {
        "statusCode": 200,
        "data": {
         
        "_id": "userId",
        "username": "john130",
        "email": "john@example.com",
        "fullname": {
         "John Doe"
        },
        "avatar": "/uploads/avatar.jpg",
        "coverImage": "/uplods/coverImage",
        "watchHistory" : [],
        "createdAt": "2025-06-30",
        "updatedAt":"2025-06-30",
        "__v": 0
        },
        "message": "User registered successfully",
        "success": true
        }

## User Login Endpoint

- Endpoint: /users/login
- Method: POST
- Description:  
  Logs in a user and returns an access token and refresh token.

- Request Body:

        {
        "email": "user@example.com",
        "password": "yourpassword"
        }

### Example Response:

        {
    "statusCode": 200,
    "data": {
        "user": {
            "_id": "id",
            "username": "one112243",
            "email": "one1123422@gmail.com",
            "fullname": "onesdfs sdf",
            "avatar": "http://res.cloudinary.com/da5xrx178/image.png",
            "coverImage": "http://res.cloudinary.com/image.png",
            "watchHistory": [],
            "createdAt": "2025-06-21T14:33:05.051Z",
            "updatedAt": "2025-06-21T17:29:14.178Z",
            "__v": 0
        },
        "accessToken": "token-hashcode"
    },
    "message": "User logged in successfully",
    "success": true
}

## Refresh Access Token

- Endpoint: /users/refresh-token
- Method: POST
- Description:  
  Generates a new access token using a valid refresh token.

- Request Body:

        {
        "refreshToken": "REFRESH_TOKEN"
        }

### Example Response:

   {
    "statusCode": 200,
    "data": {
        "accessToken": "token",
        "refreshToken": "new refresh token"
    },
    "message": "Access token refreshed successfully",
    "success": true
}

## Logout User

- Endpoint: /users/logout
- Method: POST
- Auth Required: Yes (JWT)
- Description:  
  Logs the user out by clearing tokens or sessions.

- Example Response:

       {
        "statusCode": 200,
        "data": {},
        "message": "User logged out successfully",
        "success": true
        }

## Change Password

- Endpoint: /users/change-password
- Method: POST
- Auth Required: Yes
- Request Body:

        {
        "oldPassword": "old_password",
        "newPassword": "new_password"
        }

### Example Response:

        {
        "statusCode": 200,
        "data": {},
        "message": "Password changed successfully",
        "success": true
         }

## Get Current User Info

- Endpoint: /users/current-user
- Method: GET
- Auth Required: Yes

- Example Response:

        {
        "statusCode": 200,
        "data": {
        "_id": "userId",
        "username": "user123",
        "email": "john@example.com",
        "fullname": {
             "John Doe"
        },
        "avatar": "/uploads/avatar.jpg",
        "coverImage": "/uploads/coverImage.jpg",
        "watchHistory": [],
        "createdAt": "2025-06-21T14:33:05.051Z",
        "updatedAt": "2025-06-21T18:06:16.758Z",
        "__v": 0
        },
        "message": "Current user details",
        "success": true
        }

## Update Account Details

- Endpoint: /users/update-account
- Method: PATCH
- Auth Required: Yes

- Request Body:

        {
        "fullname": "new name",
        "email": "newemail@example.com"
        }

### Example Response:

        {
            "statusCode": 200,
            "data": {
                "_id": "id",
                "username": "one23",
                "email": "newemail@example.com",
                "fullname": "new name",
                "avatar": "/image/upload/2d3.png",
                "coverImage": "/image/upload/xtr.png",
                "watchHistory": [],
                "createdAt": "2025-06-21T14:33:05.051Z",
                "updatedAt": "2025-06-22T03:43:08.776Z",
                "__v": 0
            },
            "message": "Account details updated succesfully",
            "success": true
        }

## Update Avatar

- Endpoint: /users/avatar
- Method: PATCH
- Auth Required: Yes
- Form-Data:
  avatar — image file (maxCount: 1)

- Example Response:

        {
    "statusCode": 200,
    "data": {
        "_id": "id",
        "username": "one243",
        "email": "newemail@example.com",
        "fullname": "new name",
        "avatar": "image/upload/eats.png",
        "coverImage": "/image/upload/xtr.png",
        "watchHistory": [],
        "createdAt": "2025-06-21T14:33:05.051Z",
        "updatedAt": "2025-06-22T03:49:38.973Z",
        "__v": 0
    },
    "message": "Avatar updated successfully",
    "success": true
}

## Update Cover Image

- Endpoint: /users/cover-image
- Method: PATCH
- Auth Required: Yes
- Form-Data:
  coverImage — image file (maxCount: 1)

- Example Response:

        {
            "statusCode": 200,
            "data": {
                "_id": "id",
                "username": "one143",
                "email": "newemail@example.com",
                "fullname": "new name",
                "avatar": "image/upload/xeats.png",
                "coverImage": "image/upload/uhn.png",
                "watchHistory": [],
                "createdAt": "2025-06-21T14:33:05.051Z",
                "updatedAt": "2025-06-22T04:44:35.702Z",
                "__v": 0
            },
            "message": "Cover image updated successfully",
            "success": true
        }



## Get User Channel Profile

- Endpoint: /users/c/:username
- Method: GET
- Auth Required: Yes

🔸 URL Params:

    username (string): The username of the channel

### Example Response:

    {
        "statusCode": 200,
        "data": {
            "_id": "682",
            "username": "one112243",
            "email": "newemail@example.com",
            "fullname": "new name",
            "avatar": "image/upload/v1750564181/its.png",
            "coverImage": "image/upload/v1750567477/xwuhn.png",
            "subscribersCount": 1,
            "isSubscribed": true
        },
        "message": "channel profile fetched successfully",
        "success": true
    }


## Get Watch History

- Endpoint: /users/history
- Method: GET
- Auth Required: Yes

- Example Response:

        {
        "statusCode": 200,
        "data": [
        {
        "videoId": "abc123",
        "title": "How to Build an API",
        "watchedAt": "2025-06-20T10:00:00.000Z"
        }
        ],
        "message": "Watch history fetched succcessfully"
        "success": true,
        }

---
# Videos Endpoints

## Publish a New Video

- Endpoint: /videos/publish-video
- Method: POST
- Auth Required: Yes
- Description:  
  Publishes (uploads) a new video. Accepts a thumbnail and video file.

- Form-Data:  
   Field  ->    Type ->  Description   ->   Required
  - thumbnail (File) : Thumbnail image file (yes)
  - videoFile (File) : Actual video file (yes)
  - title (String) :  Video title (yes)
  - description (String) : Video description (No)

### Example Response:

        {
            "statusCode": 200,
            "data": {
                "videoFile": "/video/upload/v175.mp4",
                "thumbnail": "image/upload/v175.png",
                "description": "uploading the first video",
                "duration": 14.973292,
                "views": 0,
                "isPublished": true,
                "_id": "6850ef07",
                "createdAt": "2025-06-22T07:42:15.294Z",
                "updatedAt": "2025-06-22T07:42:15.294Z",
                "__v": 0,
                "owner": "682d92"
            },
            "message": "Video uploaded successfully",
            "success": true
        }


## Update Video Metadata

- Endpoint: /videos/update-video/:videoId
- Method: PUT
- Auth Required: Yes
- Description:  
  Updates the video’s metadata or thumbnail. You can update any of the following fields.

🔸 URL Params:

    videoId (string): ID of the video to update.

- Form-Data (Optional):
   Field -> Type -> Description
  - thumbnail (File) : New thumbnail image
  - title (String) : New title
  - description (String) : New description

### Example Response:

       {
            "statusCode": 200,
            "data": {
                "_id": "7678689hkjdhfks",
                "videoFile": "video/upload/v1.mp4",
                "thumbnail": "/image/upload/v175.jpg",
                "description": "uploading the first video with edit",
                "duration": 14.973292,
                "views": 0,
                "isPublished": true,
                "createdAt": "2025-06-22T07:42:15.294Z",
                "updatedAt": "2025-06-22T09:23:38.336Z",
                "__v": 0,
                "owner": "68a0ccf02d92"
            },
            "message": "Updated",
            "success": true
        }

## Delete a Video

- Endpoint: /videos/delete/:videoId
- Method: DELETE
- Auth Required: Yes
- Description:  
  Deletes a video permanently by its ID.

🔸 URL Params:

    videoId (string): ID of the video to delete.

### Example Response:

    {
    "statusCode": 200,
    "data": {},
    "message": "Video deleted successfully",
    "success": true
    }
## Toggle Publish Status

- Endpoint: /videos/publish-status/:videoId
- Method: PATCH
- Auth Required: Yes
- Description:  
  Toggles the isPublished status of a video. If it is published, it becomes unpublished and vice versa.

🔸 URL Params:

    videoId (string): ID of the video to toggle publish status.

### Example Response:

    {
    "statusCode": 200,
    "data": {
        "_id": "6857c39930b",
        "videoFile": "/video/upload/v175d.mp4",
        "thumbnail": "/image/upload/v17.png",
        "description": "uploaing the first video",
        "duration": 14.973292,
        "views": 0,
        "isPublished": false,
        "createdAt": "2025-06-22T08:49:29.045Z",
        "updatedAt": "2025-06-22T09:34:47.027Z",
        "__v": 0,
        "owner": "62d92"
    },
    "message": "Updated",
    "success": true
}
## Get Video by ID

- Endpoint: /videos/vid/:videoId
- Method: GET
- Description:  
  Fetches a single video by its ID.

🔸 URL Params:

    videoId (string): ID of the video to fetch.

### Example Response:

       {
            "statusCode": 200,
            "data": {
                "_id": "gsd45342hfwd",
                "videoFile": "/video/upload/v175.mp4",
                "thumbnail": "/image/upload/v1750.jpg",
                "description": "uploaing the first video with edit",
                "duration": 14.973292,
                "views": 0,
                "isPublished": true,
                "createdAt": "2025-06-22T07:42:15.294Z",
                "updatedAt": "2025-06-22T09:23:38.336Z",
                "__v": 0,
                "owner": "6856c0ccf02d92"
            },
            "message": "Video fetched",
            "success": true
        }




##  Get All Videos

- Endpoint: /videos
- Method: GET
- Description:  
   Fetches a list of all published videos from the platform.

- Example Response:

        {
        "statusCode": 200,
        "data": [
        {
        "_id": "videoId1",
        "title": "Intro to JavaScript",
        "thumbnail": "/uploads/thumbnail1.jpg",
        "isPublished": true
        },
        {
        "_id": "videoId2",
        "title": "React Hooks Deep Dive",
        "thumbnail": "/uploads/thumbnail2.jpg",
        "isPublished": true
        }
        ],
        "success": true,
        "message": "Videos fetched successfully"
        }



## Contributing
Pull requests are welcome. For major changes, open an issue first to discuss what you would like to change.

## Future Improvements
- Video streaming support

- Real-time chat/comments with WebSockets

- Admin dashboard

- Testing with Jest

