import express from "express";
// // const a = require("../controllers/auth")
// // import { register } from a;
// import { logout, register } from "../controllers/auth.js";
// import { login } from "../controllers/auth.js";
import { stocks,buy_stock ,sell_stock} from "../controllers/stocks.js";
import { give_quote, placeorder } from "../OrderBook/OrderBook.js";
const router = express.Router()

router.post("/quote", give_quote);
router.post("/buy",placeorder)
router.post("/sell",sell_stock)
export default router