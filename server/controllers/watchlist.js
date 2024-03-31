import { get_watchlist } from "../database.js";
import jwt from "jsonwebtoken";
export const watchlist = (req,res)=>{
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

            const target = await get_watchlist(id);
            return res.status(200).json(target);
        });
};


