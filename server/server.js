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
import { getInvestment, getLossGain, CurrentValue } from './database.js'; // Import the new function
import { addAdmin, get_loss_gain, get_admin_pass, getCompanies } from './database.js'; // Import the new function

dotenv.config();

const app = express();
const stripe = new Stripe('sk_test_51PT5yj07MobmpSNs5EAJdraWi30umCVYNYeljsLjmVTIx11p89zL3RwLGuGFQlpFGa4ojQj23dY7CuRE8NoJGicD00Y1soKXB3');
export const bids = [
    { userId: 1, price: 100, quantity: 10 },
    { userId: 2, price: 150, quantity: 15 },
    { userId: 3, price: 120, quantity: 20 }
];
export const asks = [
    { userId: 4, price: 200, quantity: 25 },
    { userId: 5, price: 180, quantity: 10 },
    { userId: 6, price: 220, quantity: 5 }
];

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
