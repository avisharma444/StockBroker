import { get_stocks,get_stocks_by_id, orderItem } from "../database.js";
import jwt from "jsonwebtoken";
import { sellItem} from "../database.js";
export const stocks = async (req,res)=>{


        const target = await get_stocks();
        return res.status(200).json(target);
        // });
};
export const user_stocks = async (req,res)=>{
    // try{
        const token = req.cookies.accesstoken;
        if(!token){
            return res.status(401).json("not logged in !")
        }
        jwt.verify(token, "secretkey", async (err, userInfo) => {
            if (err) {
                return res.status(403).json("invalid token");
            }
        const id = await userInfo.id;
        console.log("id: ",id.user_id)

        const target = await get_stocks_by_id(id);
        return res.status(200).json(target);
        });
    // }
}

export const buy_stock = async (req, res) => {
    try {
        const quantity = await req.body.quantity;
        const stock_id = await req.body.stock_id;
        console.log("from controlller - ",quantity,stock_id)
        const token = req.cookies.accesstoken;

        if (!token) {
            return res.status(401).json("not logged in !");
        }

        jwt.verify(token, "secretkey", async (err, userInfo) => {
            if (err) {
                return res.status(403).json("invalid token");
            }
            
            const id = await userInfo.id;
            console.log("id: ", id.user_id);

            try {
                const target = await orderItem(id, stock_id, quantity);
                return res.status(200).json(target);
            } catch (error) {
                // Handle the error from orderItem function
                console.error('Error ordering item:', error);
                return res.status(500).json('Stock id not found');
            }
        });
    } catch (error) {
        // Handle other synchronous errors
        console.error('Error in buy_stock controller:', error);
        return res.status(500).json('Stock id not found');
    }
};

export const sell_stock = async (req, res) => {
    try {
        const quantity = await req.body.quantity;
        const stock_id = await req.body.stock_id;
        const token = req.cookies.accesstoken;
        console.log("efsfsfs - ",quantity,stock_id)
        if (!token) {
            return res.status(401).json("not logged in !");
        }

        jwt.verify(token, "secretkey", async (err, userInfo) => {
            if (err) {
                return res.status(403).json("invalid token");
            }
            
            const id = await userInfo.id;
            console.log("id: ", id.user_id);

            try {
                const target = await sellItem(id, stock_id, quantity);
                return res.status(200).json(target);
            } catch (error) {
                // Handle the error from orderItem function
                console.error('Error ordering item:', error);
                return res.status(500).json('Stock id not found');
            }
        });
    } catch (error) {
        // Handle other synchronous errors
        console.error('Error in buy_stock controller:', error);
        return res.status(500).json('Stock id not found');
    }
};

