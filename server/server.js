import express from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userroutes from './routes/users.js';
import authroutes from './routes/auth.js';
import watchlistroutes from './routes/watchlist.js';
import stocksroutes from './routes/stocks.js';
import userstocksroutes from './routes/stockid.js';
import orderroutes from './routes/order.js';
import { addAdmin, get_loss_gain, get_admin_pass, getCompanies,get_specific_stock } from './database.js'; // Import the new function
import { order_endpoint } from './OrderBook/OrderBook.js';
import { getInvestment, getLossGain, CurrentValue } from './database.js'; // Import the new function

dotenv.config();

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Enable CORS for all routes
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", true);
    next();
});

app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(cookieParser());
app.use("/api/v1/userinfo", userroutes);
app.use("/server/stocks", stocksroutes);
app.use("/api/v1/user", authroutes);
app.use("/server/watchlist", watchlistroutes);
app.use("/server/stockbyid", userstocksroutes);
app.use("/server/order", orderroutes);

app.get("/admin", async (req, res) => {
    console.log("reached admin");
    const admininfo = await get_admin_pass();
    res.send(admininfo);
});

app.get("/getlossgain/:mn", async (req, res) => {
    console.log("reached logg_gain");
    const mn = req.params.mn;
    const info = await get_loss_gain(mn);
    res.send(info);
});

app.post("/admin", async (req, res) => {
    console.log("reached add_admin");
    const { username, password } = req.body;
    const info = await addAdmin(username, password);
    res.status(201).send(info);
});

app.post('/create-payment-intent', async (req, res) => {
    const { amount } = req.body;
    const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: 'usd',
    });
    res.send({
        clientSecret: paymentIntent.client_secret,
    });
});

app.get('/api/companies', async (req, res) => {
    try {
        const companies = await getCompanies(); // This is where the getCompanies function is called
        res.json(companies);
    } catch (error) {
        res.status(500).send('Server error');
    }
});

app.post('/order', order_endpoint);

// endpoint to get a specific price from the backend
app.post('/getPrice',async(req,res)=>{
    try{
             const stockInfo = await get_specific_stock(req.body.stock_id);
              res.json(stockInfo);
               
    }
    catch(err){
        console.error('Error fetching stock information:', error);
        res.status(500).json({ message: 'Could not fetch stock information', error: error.message });
    }
    });
app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(500).send('fault');
});

app.listen(8080, () => {
    console.log("server started running at port 8080");
});


app.get('/api/getInvestment', async (req, res) => {
    const userId = req.query.userId;
    try {
        const investment = await getInvestment(userId);
        res.json(investment);
    } catch (error) {
        res.status(500).send('Server error');
    }
});

app.get('/api/getLossGain', async (req, res) => {
    const userId = req.query.userId;
    try {
        const lossGain = await getLossGain(userId);
        res.json(lossGain);
    } catch (error) {
        res.status(500).send('Server error');
    }
});

app.get('/api/getCurrentValue', async (req, res) => {
    const userId = req.query.userId;
    try {
        const currentValue = await CurrentValue(userId);
        res.json(currentValue);
    } catch (error) {
        res.status(500).send('Server error');
    }
});
