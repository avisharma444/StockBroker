import express from "express";
// // const a = require("../controllers/auth")
// // import { register } from a;
// import { logout, register } from "../controllers/auth.js";
// import { login } from "../controllers/auth.js";
import { watchlist } from "../controllers/watchlist.js";
const router = express.Router()

router.get("/",watchlist)

export default router