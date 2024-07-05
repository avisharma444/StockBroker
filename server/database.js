import mysql from 'mysql2'   
import dotenv from 'dotenv'

dotenv.config()

export const pool = mysql.createPool({ 
    host : process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password : process.env.MYSQL_PASSWORD,
    database : process.env.MYSQL_DATABASE
}).promise()

export async function get_admin_pass(){
    const [query_res] = await pool.query("SELECT * from admin");
    return query_res;
}

export async function get_loss_gain(mn){

    const [query_res] = await pool.query(`
                                        Select email,user_id from 
                                        user NATURAL JOIN portfolio
                                        WHERE total_loss_gain>=${mn};`);
    return query_res;

}

export async function getuser(aadhar, PAN_card, phone_no, email) {

    const query = `
        SELECT * FROM USER 
        WHERE aadhar = ? OR phone_no = ? OR PAN_card = ? OR email = ?`;
    
    const values = [aadhar, phone_no, PAN_card, email];

    try {
        const [rows] = await pool.query(query, values);
        // console.log(rows)
        return rows;
    } catch (error) {
        // Handle error
        console.error("Error executing query:", error);
        throw error; // Rethrow the error or handle as appropriate
    }

}

export async function getuserinfo(user_id) {
    
    const query = `SELECT * FROM USER WHERE user_id = ? `;
    const values = [user_id];
    try {
        const [rows] = await pool.query(query, values);
        console.log("getting user info from token - ",rows)
        return rows[0];
    } catch (error) {
        // Handle error
        console.error("Error executing query:", error);
        throw error; // Rethrow the error or handle as appropriate
    }

}

export async function flip_db_balance(user1, user2, stock_id, price, quantity,stock_symbol) {
    try {
        // Retrieve stock information
        console.log("temp0 - ",user1, user2, stock_id, price, quantity,stock_symbol)
        const stock_info = await find_specific_stock(stock_id);
        const ticker = stock_symbol;
        const sid = stock_info[0].stock_id
        // Query to fetch balances for both users
        const query1 = `SELECT balance FROM USER WHERE user_id = ?`;
        const [balance1] = await pool.query(query1, [user1]);
        const [balance2] = await pool.query(query1, [user2]);

        // Query to fetch stock holdings for both users
        const query3 = `SELECT ${ticker} as stock FROM userstock WHERE user_id = ?`;
        const [stocks1] = await pool.query(query3, [user1]);
        const [stocks2] = await pool.query(query3, [user2]);
        console.log("temp1 = ",stocks1 , stocks2 , quantity , price)
        console.log("temp2 = ",balance1 , balance2 , quantity , price)
        // Calculate new balances and stock holdings
        const newStocks1 = parseInt(stocks1[0].stock )- quantity;
        const newStocks2 = parseInt(stocks2[0].stock) + quantity;
        const newValue1 = balance1[0].balance + (quantity * price);
        const newValue2 = balance2[0].balance - (quantity * price);
        if(newStocks1 < 0 || newValue2 < 0 ){

        }
        console.log("updating - ")
        console.log(user1, user2, stock_id, price, quantity,stock_symbol)
        // Update queries to update balances and stock holdings
        const updateQuery1 = `UPDATE USER SET balance = ? WHERE user_id = ?`;
        await pool.query(updateQuery1, [newValue1, user1]);

        const updateQuery2 = `UPDATE USER SET balance = ? WHERE user_id = ?`;
        await pool.query(updateQuery2, [newValue2, user2]);

        const updateQuery3 = `UPDATE userstock SET ${ticker} = ? WHERE user_id = ?`;
        await pool.query(updateQuery3, [newStocks1, user1]);

        const updateQuery4 = `UPDATE userstock SET ${ticker} = ? WHERE user_id = ?`;
        await pool.query(updateQuery4, [newStocks2, user2]);
        
        const updateQuery5 = `INSERT INTO transactions (user_id, stock_id, transaction_value, transaction_type, quantity) VALUES (?, ?, ?, ?, ?)`;
        await pool.query(updateQuery5, [user2, sid, (quantity * price) , "buy" , quantity]);
        await pool.query(updateQuery5, [user1, sid, (quantity * price) , "sell" , quantity]);
        // Optionally return something meaningful upon success
        const updateQuery6 = `UPDATE stock SET last_traded_price = ? WHERE (stock_id = ?)`;
        await pool.query(updateQuery6, [price , sid]);

        return { success: true, message: 'Transaction completed successfully' };
    } catch (error) {
        console.error('Error executing transaction:', error);
        throw error; // Propagate the error upwards
    }
}

export async function finduser(email,password) {
    const query = `
        SELECT * FROM USER 
        WHERE password = ? AND email = ?`;
    
    const values = [password, email];

    try {
        const [rows] = await pool.query(query, values);
        // console.log(rows)
        return rows;
    } catch (error) {
        // Handle error
        console.error("Error executing query:", error);
        throw error; // Rethrow the error or handle as appropriate
    }
}
export const finduserLogin = async (email) => {
    try {
        const query = `
        SELECT * FROM USER WHERE email = ?`;
    
        const values = [email];
        const [rows] = await pool.query(query, values);
        if (rows.length > 0) {
            return rows[0];
        } else {
            return null;
        }
    } catch (error) {
        console.error("Error in finduserLogin:", error);
        throw error;
    }
};
export async function get_user_balance(user_id){
     const query = `SELECT balance FROM USER WHERE user_id = ?`;
    const [results] = await pool.query(query, [user_id]);
    console.log(results);
    const userBalance = results[0].balance;
    return userBalance;
}
export async function insertuser(password,aadhar,PAN_card,phone_no,email,dob,name){
    try{
    const [query_res1] = await pool.query("SELECT MAX(user_id) as id FROM user;");
    const newid = (query_res1[0].id) + 1
    const [insertResult] = await pool.query(`
            INSERT INTO user (user_id, email, password, PAN_card, aadhar, DateOfBirth, created_at, phone_no,name)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?,?);
        `, [newid, email, password, PAN_card, aadhar, '1990-01-15','2024-02-10 06:30:00', phone_no,name]);

    return insertResult;

    }catch(err){
        console.error('Error inserting user:', err);
        throw error;
    }
}

export async function addAdmin(username , password){
    const [query_res] = await pool.query(`
    INSERT into admin(username, password)
    VALUES (?,?)
    `,[username,password])
    return get_admin_pass();
}
export async function get_user_transactions(user_id){
    const [query_res] = await pool.query(`
    select * from transactions where user_id = ?
    `,[user_id])
    console.log("TRANSACTIONS - ",query_res)
    return query_res
}
export async function get_watchlist(user_id) {
    
    const query = `
        select s.stock_id,s.current_price,s.last_traded_price from watchlist as w JOIN stock as s on (w.stock_id  = s.stock_id) WHERE w.user_id = ?    `;
    console.log("in watchlist : ",user_id)
    const values = [user_id];
    
    try {
        const [rows] = await pool.query(query, values);
        console.log(rows)
        return rows;
    } catch (error) {
        // Handle error
        console.error("Could not fetch watchlist", error);
        throw error; // Rethrow the error or handle as appropriate
    }
}

export async function get_stocks() {
    
    const query = `
        select S.STOCK_ID,S.CURRENT_PRICE,S.LAST_TRADED_PRICE,C.COMPANY_NAME FROM STOCK AS S JOIN ASSETOWNERSHIP AS C ON (S.STOCK_ID = C.STOCK_ID)`;
    console.log("in stocks : ")
    const values = [];
    
    try {
        const [rows] = await pool.query(query, values);
        console.log(rows)
        return rows;
    } catch (error) {
        // Handle error
        console.error("Could not fetch stocks", error);
        throw error; // Rethrow the error or handle as appropriate
    }
}

export async function get_user_stock() {
        
    const query = `
        select S.STOCK_ID,S.CURRENT_PRICE,S.LAST_TRADED_PRICE,C.COMPANY_NAME 
        FROM STOCK AS S JOIN ASSETOWNERSHIP AS C ON (S.STOCK_ID = C.STOCK_ID);
    `
    const values = [];
    console.log("in user stocks : ")

    
    try {
        const [rows] = await pool.query(query, values);
        console.log(rows)
        return rows;
    } catch (error) {
        // Handle error
        console.error("Could not fetch stocks", error);
        throw error; // Rethrow the error or handle as appropriate
    }
}
export async function get_stocks_by_id(user_id) {
    
    const query = `
        select S.STOCK_ID,S.CURRENT_PRICE,S.LAST_TRADED_PRICE,S.COMPANY_NAME from (select S.STOCK_ID,S.CURRENT_PRICE,S.LAST_TRADED_PRICE,C.COMPANY_NAME FROM STOCK AS S JOIN ASSETOWNERSHIP AS C ON (S.STOCK_ID = C.STOCK_ID)) as S join contains as P where P.user_id = ? and (P.stock_id = S.stock_id)`;
    console.log("in stocks by id : ")
    const values = [user_id];
    
    try {
        const [rows] = await pool.query(query, values);
        console.log(rows)
        return rows;
    } catch (error) {
        // Handle error
        console.error("Could not fetch stocks by id", error);
        throw error; // Rethrow the error or handle as appropriate
    }
}

export async function orderItem(user_id, stock_id, quantity) {
    // console.log(user_id,stock_id,quantity)
    const pricequery = `select current_price from stock where stock_id = ?`
    const pricevalues = [stock_id]
    const [rows1] = await pool.query(pricequery, pricevalues);
    
    const p = await rows1[0].current_price * quantity;
    // console.log("moye moye - ",p,rows1)
    const orderQuery = `
        INSERT INTO transactions (user_id, stock_id, transaction_value, transaction_type,quantity)
        VALUES (?, ?,?, "buy",?)
    `;
    const values = [user_id, stock_id,p, quantity];
    try {
        const[rows] = await pool.query(orderQuery, values);
        return rows;
    } catch (error) {
        console.error('Error ordering item:', error);
        throw error;
    }
}

export async function sellItem(user_id, stock_id, quantity) {
    const pricequery = `select current_price from stock where stock_id = ?`
    const pricevalues = [stock_id]
    const [rows1] = await pool.query(pricequery, pricevalues);
    
    const p = await rows1[0].current_price * quantity;
    // console.log("moye moye - ",p,rows1)
    const orderQuery = `
    INSERT INTO transactions (user_id, stock_id, transaction_value, transaction_type,quantity)
    VALUES (?, ?,?, "sell",?)`;
    const values = [user_id, stock_id,p, quantity];
    try {
        const[rows] = await pool.query(orderQuery, values);
        return rows;
    } catch (error) {
        console.error('Error ordering item:', error);
        throw error;
    }
}
export async function getCompanies() {
    console.log("getCompanies function called");
    const query = `select * from assetownership as c natural join stock as s;`; 
    try {
      const [rows] = await pool.query(query);
    //   console.log(rows);

      return rows;
    } catch (error) {
      console.error("Error fetching companies from the database", error);
      throw error;
    }
  }

export async function getInvestment(user_id) {
    console.log("in investment - ",user_id)
    const query = `SELECT * FROM transactions WHERE user_id = ? and transaction_type = "buy"`;
    const values = [user_id];
    try {
        const [rows] = await pool.query(query, values);
        // return the sum of values of transaction_value*quantity
        let sum = 0;
        for (let i = 0; i < rows.length; i++) {
            sum += rows[i].transaction_value*rows[i].quantity;
        }
        console.log("investment - ",sum)
        return sum;
    } catch (error) {
        console.error("Error fetching investment details", error);
        throw error;
    }
}

export async function getLossGain(user_id) {
    const query = `SELECT * FROM transactions WHERE user_id = ? and transaction_type = "sell"`;
    const values = [user_id];
    try {
        const [rows] = await pool.query(query, values);
        // return the sum of values of transaction_value*quantity
        let sum = 0;
        for (let i = 0; i < rows.length; i++) {
            sum = sum + rows[i].transaction_value*rows[i].quantity;
        }
        const investment = await getInvestment(user_id);
        const currentValue = await CurrentValue(user_id);

        // Calculate the final sum
        sum = sum - investment + currentValue;
        return sum;
    } catch (error) {
        console.error("Error fetching investment details", error);
        throw error;
    }

}

export async function find_specific_stock(stock_id){
    const query = `SELECT * FROM stock WHERE stock_id = ?`;
    const values = [stock_id];
    try {
        const [rows] = await pool.query(query, values);
        console.log("specific stock = ", rows)
        return rows;

    } catch (error) {
        console.error("Error fetching investment details", error);
        throw error;
    }
}
export async function CurrentValue(user_id) {
    const query = `SELECT portfolio.stock_id,current_price, 
portfolio.quantity AS portfolio_quantity  FROM portfolio inner join
 stock on portfolio.stock_id = stock.stock_id where user_id = ?;`;
    const values = [user_id];
    try {
        const [rows] = await pool.query(query, values);
        // return the sum of values of transaction_value*quantity
        let sum = 0;
        for (let i = 0; i < rows.length; i++) {
            sum += rows[i].current_price*rows[i].portfolio_quantity;
        }
        console.log("current value - ",sum)
        return sum;
    } catch (error) {
        console.error("Error fetching investment details", error);
        throw error;
    }
}
  
// const ans = await get_loss_gain(1000);
// const new_admin = await addAdmin("admin14","tp");

// console.log(ans)
// pool.end();
