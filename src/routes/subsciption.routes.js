import {Router} from "express";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import { getChannelSubscriber, getSubscribedChannels, toggleSubscription } from "../controller/subscription.controller.js";

const router = Router();
router.use(verifyJWT);

router.route("/:channelId").put(toggleSubscription);
router.route("/channel-subs/:channelId").get(getChannelSubscriber)
router.route("/subscribed-channels/:channelId").get(getSubscribedChannels)


export default router
