import express from "express";
// // const a = require("../controllers/auth")
// // import { register } from a;
// import { logout, register } from "../controllers/auth.js";
// import { login } from "../controllers/auth.js";
import { stocks,buy_stock ,sell_stock} from "../controllers/stocks.js";
const router = express.Router()

router.post("/buy",buy_stock)
router.post("/sell",sell_stock)
export default router