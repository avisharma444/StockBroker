import express from "express";
// // const a = require("../controllers/auth")
// // import { register } from a;
import { logout, register } from "../controllers/auth.js";
import { login } from "../controllers/auth.js";
const   router = express.Router()

router.get("/",login)
router.post("/register",register)
router.post("/login",login)
router.post("/logout",logout)
export default router