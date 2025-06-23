import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
//who can talk to your backend
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

//common middlewares
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
//images and all the decorative
app.use(express.static("public"));
app.use(cookieParser());
 
//import routes
import userRouter from "./routes/user.routes.js";
import healthcheckRouter from "./routes/healthcheck.routes.js";
import  videoRouter  from "./routes/video.routes.js";
import  subscriptionRouter  from "./routes/subsciption.routes.js";
import  playlistRouter  from "./routes/playlist.routes.js";
import  likeRouter  from "./routes/like.routes.js";
import  communityRouter  from "./routes/community.routes.js";
import  commentRouter  from "./routes/comment.routes.js";

import { errorHandler } from "./middlewares/error.middleware.js"; 

//routes
app.use("/api/v1/healthcheck", healthcheckRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/videos",videoRouter)
app.use("/api/v1/subs",subscriptionRouter);
app.use("/api/v1/playlist",playlistRouter);
app.use("/api/v1/like",likeRouter);
app.use("/api/v1/community",communityRouter)
app.use("/api/v1/comment",commentRouter)
app.use(errorHandler);


export {app};
