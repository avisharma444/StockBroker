import express from 'express';
import bodyParser from 'body-parser';
import { get_user_stock, find_specific_stock, flip_db_balance, get_user_balance } from '../database.js';
import { bids, asks } from '../server.js';

const app = express();
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
// export async function give_quote(stock_id){
//   stock_info = find_specific_stock(stock_id);
//   return stock_info;
// }
function get_user_stock_info(){
    const users = get_user_stock()
    return users
};
function get_all_stocks(){
  const stocks = get_user_stock()
  return stocks
};
export const give_quote = async (req,res)=> {
    const stock_symbol = req.query.stock_id;
    const number = req.query.quantity;
    const requestedQuantity = number; // Quantity of stocks requested by the user
    // const stock_info = await find_specific_stock(stock_id);
    // Calculate the average price for the requested quantity
    let remainingQty = requestedQuantity;
    let totalPrice = 0;
    let count = 0;

    // Iterate through the asks array to calculate the average price
    for (let i = 0; i < asks.length; i++) {
        if (asks[i].quantity >= remainingQty) {
            totalPrice += remainingQty * asks[i].price;
            count += remainingQty;
            remainingQty = 0;
            break;
        } else {
            totalPrice += asks[i].quantity * asks[i].price;
            count += asks[i].quantity;
            remainingQty -= asks[i].quantity;
        }
    }

    // If the requested quantity is not fulfilled by asks, check bids for the remaining quantity
    if (remainingQty > 0) {
        for (let i = 0; i < bids.length; i++) {
            if (bids[i].quantity >= remainingQty) {
                totalPrice += remainingQty * bids[i].price;
                count += remainingQty;
                remainingQty = 0;
                break;
            } else {
                totalPrice += bids[i].quantity * bids[i].price;
                count += bids[i].quantity;
                remainingQty -= bids[i].quantity;
            }
        }
    }

    if (count === 0) {
        return { success: false, message: 'Quote not possible for the requested quantity' };
    }

    const averagePrice = totalPrice / count;
    console.log("quote - ", averagePrice, count, stock_symbol);
    return res.json({ price: averagePrice, quantity: count, company_name: stock_symbol });
}
// export function get_quote(req,res){

// } 

export const placeorder = async (req,res)=> {

  console.log("BEFORE ----------------------------")
  console.log("Bids:");
  bids.forEach((bid, index) => {
      console.log(`Bid ${index + 1}: userId ${bid.userId}, price ${bid.price}, quantity ${bid.quantity}`);
  });

  // Printing asks
  console.log("\nAsks:");
  asks.forEach((ask, index) => {
      console.log(`Ask ${index + 1}: userId ${ask.userId}, price ${ask.price}, quantity ${ask.quantity}`);
  });
  console.log("BEFORE ----------------------------")
  const side = req.body.side;
  const stock_id = req.body.stock_id;
  const stock_symbol = req.body.stock_symbol
  const price = req.body.price;
  const quantity = req.body.quantity;
  const userId = req.body.user_id;
  const b = await get_user_balance(userId)
  console.log("checking - - ",price , quantity , b)
  if( side =="bid" && b < price*quantity){
    return res.status(403).json({ error: 'Insufficient balance to place order.' });
  }

  console.log("HI");
  // const stock_info = get_speci
  const remainingQty = fillOrders(side, price, quantity, userId,stock_id,stock_symbol);
  if (remainingQty === 0) {
    console.log("AFTER ----------------------------")
    console.log("Bids:");
    bids.forEach((bid, index) => {
        console.log(`Bid ${index + 1}: userId ${bid.userId}, price ${bid.price}, quantity ${bid.quantity}`);
    });

    // Printing asks
    console.log("\nAsks:");
    asks.forEach((ask, index) => {
        console.log(`Ask ${index + 1}: userId ${ask.userId}, price ${ask.price}, quantity ${ask.quantity}`);
    });
    console.log("AFTER ----------------------------")
    res.json({ filledQuantity: quantity });
    return;
  }
  console.log("Quantity Filled -  ", quantity , "Remaining - " , remainingQty)
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
  console.log("AFTER ----------------------------")
  console.log("Bids:");
  bids.forEach((bid, index) => {
      console.log(`Bid ${index + 1}: userId ${bid.userId}, price ${bid.price}, quantity ${bid.quantity}`);
  });

  // Printing asks
  console.log("\nAsks:");
  asks.forEach((ask, index) => {
      console.log(`Ask ${index + 1}: userId ${ask.userId}, price ${ask.price}, quantity ${ask.quantity}`);
  });
  console.log("AFTER ----------------------------")
  res.status(200).json({
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

async function flipBalance(userId1, userId2, quantity, price,stock_id,stock_symbol) {

  const ans = await flip_db_balance(userId1,userId2,stock_id,price,quantity,stock_symbol);

}
function fillOrders(side, price, quantity, userId,stock_id,stock_symbol) {
  let remainingQuantity = quantity;
  if (side === "bid") {
    for (let i = asks.length - 1; i >= 0; i--) {
      if (asks[i].price > price) {
        continue;
      }
      if (asks[i].quantity > remainingQuantity) {
        asks[i].quantity -= remainingQuantity;
        flipBalance(asks[i].userId, userId, remainingQuantity, asks[i].price,stock_id,stock_symbol);
        return 0;
      } else {
        remainingQuantity -= asks[i].quantity;
        flipBalance(asks[i].userId, userId, asks[i].quantity, asks[i].price,stock_id,stock_symbol);
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
        flipBalance(userId, bids[i].userId, remainingQuantity, price,stock_id,stock_symbol);
        return 0;
      } else {
        remainingQuantity -= bids[i].quantity;
        flipBalance(userId, bids[i].userId, bids[i].quantity, price,stock_id,stock_symbol);
        bids.pop();
      }
    }
  }
  return remainingQuantity;
}
// export { app };