import e from 'express';
import {finduser, pool} from '../database.js'
import { getuser } from '../database.js'
import { insertuser } from '../database.js';
import jwt from 'jsonwebtoken'
// import { finduser } from '../database.js';
export const register = async (req,res)=>{
    const adhaar = req.body.adhaar;
    const PAN_card = req.body.PAN_card;
    const phone_no = req.body.phone_no;
    const email = req.body.email;
    const password = req.body.password;
    const dob = req.body.dbo;
    const name = req.body.name;


    const try_user =  await getuser(adhaar,PAN_card,phone_no,email)
    console.log("sdf",try_user)
    if(try_user.length>0){
        
         return res.status(409).json("user already exists indb")
    }
    const inserting = insertuser(password,adhaar,PAN_card,phone_no,email,dob,name)
    return res.status(200).json("user created!")
}
export const login = async (req, res) => {
    console.log("in login");
    const email = req.body.email;
    const password = req.body.password;
    
    try {
        const try_user = await finduser(email, password);
        // console.log(try_user);
        
        if (try_user == null) {
            return res.status(404).json("email/password is not correct");
        }
        
        const uid = try_user[0];
        const token = jwt.sign({ id: uid.user_id }, "secretkey");
        
        res.cookie("accesstoken", token, {
            httpOnly: true,
        }).status(200).json(uid);
    } catch (error) {
        console.error("Error in login:", error);
        return res.status(500).json("Cant Find Username or password");
    }
};
export const logout = (req,res)=>{
    res.clearCookie("accesstoken",{
        secure:true,
        sameSite:"none"
    }).status(200).json("user has logged out")
};
