import express from "express";
// // const a = require("../controllers/auth")
// // import { register } from a;
// import { logout, register } from "../controllers/auth.js";
// import { login } from "../controllers/auth.js";
import { stocks, user_stocks } from "../controllers/stocks.js";
const router = express.Router()

router.get("/",user_stocks)

export default router