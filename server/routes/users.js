import express from "express";
// import { getUser } from "../controllers/user";
import {get_user_info } from "../controllers/user.js";
const router = express.Router()

router.post("/",get_user_info)

export default router