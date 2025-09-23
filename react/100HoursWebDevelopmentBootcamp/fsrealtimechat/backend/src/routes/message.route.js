import express from "express"
import { protectRoute } from "../middleware/auth.middleware"
import { getMessages, getUsersForSiderbar, sendMessage } from "../controllers/message.controller"

const router = express.Router()

router.get("/users", protectRoute, getUsersForSiderbar)
router.get("/:id", protectRoute, getMessages)

router.post("/send/:id", protectRoute, sendMessage)

export default router