const express = require("express");
const bodyParser = require("body-parser");
const { get_user_stock } = require("../database");
const binaryHeap = require("binary-heap");;
const app = express();
const comparator = (a, b) => a.price - b.price;
app.use(bodyParser.json());

const TICKER = "GOOG"
const users = get_user_stock_info()

// const users = [{
//   id: "1", 
//   balances: {
//     "GOOGLE": 10,       
//     "USD": 50000   
//   }
// }, {
//   id: "2",
//   balances: {
//     "GOOGLE": 10,
//     "USD": 50000
//   }
// }];

function get_user_stock_info(){
    const users = get_user_stock()
    return users
};
function get_all_stocks(){
  const stocks = get_user_stock()
  return stocks
};

const bids = [];
const asks = [];

// Place a limit order, this function is the endpoint of /server/order
export const order_endpoint = async (req, res) => {
  const side = req.body.side;
  const price = req.body.price;
  const quantity = req.body.quantity;
  const userId = req.body.userId;

  const remainingQty = fillOrders(side, price, quantity, userId);

  if (remainingQty === 0) {
    res.json({ filledQuantity: quantity });
    return;
  }

  if (side === "bid") {
    bids.push({
      userId,
      price,
      quantity: remainingQty
    });
    bids.sort((a, b) => a.price < b.price ? -1 : 1);

  } else {
    asks.push({
      userId,
      price,
      quantity: remainingQty
    })
    asks.sort((a, b) => a.price < b.price ? 1 : -1);
  }

  res.json({
    filledQuantity: quantity - remainingQty,
  });
};

// app.get("/depth", (req, res) => {
export const  GetDepth= async (req,res)=>{
  const depth = {};

  for (let i = 0; i < bids.length; i++) {
    if (!depth[bids[i].price]) {
      depth[bids[i].price] = {
        quantity: bids[i].quantity,
        type: "bid"
      };
    } else {
      depth[bids[i].price].quantity += bids[i].quantity;
    }
  }

  for (let i = 0; i < asks.length; i++) {
    if (!depth[asks[i].price]) {
      depth[asks[i].price] = {
        quantity: asks[i].quantity,
        type: "ask"
      };
    } else {
      depth[asks[i].price].quantity += asks[i].quantity;
    }
  }
   
  res.json({ depth });
};

// app.get("/balance/:userId", (req, res) => {
export const getUserBalance = async (req,res)=>{
  const userId = req.params.userId;
  const user = users.find(x => x.id === userId);
  res.json({ balances: user.balances });
};

app.get("/quote", (req, res) => {
  // TODO: Assignment
});
export const UpdateUserBalance = async (req,res)=>{
  const userId = req.params.userId;
  const user = users.find(x => x.id === userId);
  res.json({ balances: user.balances });
};
function flipBalance(userId1, userId2, quantity, price) {
  let user1 = users.find(x => x.id === userId1);
  let user2 = users.find(x => x.id === userId2);
  if (!user1 || !user2) {
    return;
  }
  user1.balances[TICKER] -= quantity;
  user2.balances[TICKER] += quantity;
  user1.balances["USD"] += (quantity * price);
  user2.balances["USD"] -= (quantity * price);
}

function fillOrders(side, price, quantity, userId) {
  let remainingQuantity = quantity;
  if (side === "bid") {
    for (let i = asks.length - 1; i >= 0; i--) {
      if (asks[i].price > price) {
        continue;
      }
      if (asks[i].quantity > remainingQuantity) {
        asks[i].quantity -= remainingQuantity;
        //flipBalance(asks[i].userId, userId, remainingQuantity, asks[i].price);
        return 0;
      } else {
        remainingQuantity -= asks[i].quantity;
       // flipBalance(asks[i].userId, userId, asks[i].quantity, asks[i].price);
        asks.pop();
      }
    }
  } else {
    for (let i = bids.length - 1; i >= 0; i--) {
      if (bids[i].price < price) {
        continue;
      }
      if (bids[i].quantity > remainingQuantity) {
        bids[i].quantity -= remainingQuantity;
        //flipBalance(userId, bids[i].userId, remainingQuantity, price);
        return 0;
      } else {
        remainingQuantity -= bids[i].quantity;
       // flipBalance(userId, bids[i].userId, bids[i].quantity, price);
        bids.pop();
      }
    }
  }

  return remainingQuantity;
}

module.exports = { app };
