import e from 'express';
import {finduser, finduserLogin, pool} from '../database.js'
import { getuser } from '../database.js'
import { insertuser } from '../database.js';
import jwt from 'jsonwebtoken'
import validator from "validator"
import bcrypt from 'bcrypt'

const createToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET)
}
// import { finduser } from '../database.js';s
export const register = async (req,res)=>{
    const adhaar = req.body.adhaar;
    const PAN_card = req.body.PAN_card;
    const phone_no = req.body.phone_no;
    const email = req.body.email;
    const password = req.body.password;
    const dob = req.body.dbo;
    const name = req.body.name;

    try{
    const try_user =  await getuser(adhaar,PAN_card,phone_no,email)
    console.log("sdf",try_user)
    if(try_user.length == 0){
        console.log("empty ans")
    }
    if(try_user.length>0){
        return res.status(409).json("user already exists indb")
    }
    console.log("here - ",email,password,adhaar,PAN_card,name)
    if(!validator.isEmail(email)){
        console.log("noooo")
        return res.json("Please enter a valid email!")
    }
    if(password.length < 8){
        console.log("no")
        return res.json("Please enter a strong password")
    }
    console.log("here - ",email,password,adhaar,PAN_card,name)
    // hashing user password
    const salt = await bcrypt.genSalt(10)
    const hashed_pass = await bcrypt.hash(password,salt)

    const inserting = insertuser(hashed_pass,adhaar,PAN_card,phone_no,email,dob,name)
    const tuser = await finduser(email, password);
    const userid = tuser[0];
    const token = createToken(userid)
    return res.status(200).json({success:true,token:token})
    }catch(err){
        console.log(err)
        res.json({success:false,message:"Failed at register stage"})
    }
}
export const login = async (req, res) => {
    console.log("in login");
    const email = req.body.email;
    const password = req.body.password;
    
    try {
        const try_user = await finduserLogin(email);
        // console.log(try_user);
        
        if (try_user == null) {
            return res.status(404).json({success:false,message:"email/password is not correct"});
        }
        
        const real_pass = try_user.password
        // console.log(try_user.password,try_user)

        const isMatch = await bcrypt.compare(password,real_pass)
        if(!isMatch){return res.json({success:false,message:"Invalid Credentials"})}

        const uid = try_user.user_id;
        // console.log("creating token with user id - ",uid);
        const token = createToken(uid)
        // console.log("created token - ",uid);
        res.json({success:true,token:token})

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



//         res.cookie("accesstoken", token, {
//             httpOnly: true,
//         }).status(200).json(uid);
//     } catch (error) {
//         console.error("Error in login:", error);
//         return res.status(500).json("Cant Find Username or password");
//     }
// };
// export const logout = (req,res)=>{
//     res.clearCookie("accesstoken",{
//         secure:true,
//         sameSite:"none"
//     }).status(200).json("user has logged out")
// };

