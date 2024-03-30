import express from "express";
// import { getUser } from "../controllers/user";
import { getUser } from "../controllers/user.js";
const router = express.Router()

router.get("/test",getUser)

export default router