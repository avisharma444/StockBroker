import express from 'express'
const app = express()
import {addAdmin,get_loss_gain,get_admin_pass} from './database.js';
import cors from 'cors';
import userroutes from './routes/users.js'
import authroutes from './routes/auth.js'
import cookieParser from 'cookie-parser';
import watchlistroutes from './routes/watchlist.js'
// Enable CORS for all routes
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Credentials", true)
    next()
})
app.use(express.json())
app.use(cors({
    origin:"http://localhost:3000",
}));
app.use(cookieParser())
app.use("/server/users",userroutes)
app.use("/server/auth",authroutes)
app.use("/server/watchlist",watchlistroutes)

app.get("/admin",async (req,res)=>{
    console.log("reached admin")
    const admininfo = await get_admin_pass()
    res.send(admininfo)
})
app.get("/getlossgain/:mn",async (req,res)=>{
    console.log("reached logg_gain")
    const mn = req.params.mn
    const info = await get_loss_gain(mn)
    res.send(info)
})
app.post("/admin",async (req,res)=>{
    console.log("reached add_admin")
    const {username , password} = req.body
    const info = await addAdmin(username, password)
    res.status(201).send(info)

})
app.use((err, req ,res ,next) =>{
    console.log(err.stack)
    res.status.send('fault')
})

app.listen(8080,()=>{
    console.log("server started running at port 8080")
})