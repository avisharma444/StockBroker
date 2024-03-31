import mysql from 'mysql2'   
import dotenv from 'dotenv'

dotenv.config()

export const pool = mysql.createPool({ 
    host : '127.0.0.1',
    user:'root',
    password : '123456',
    database : 'zerodha'
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
        console.log(rows)
        return rows;
    } catch (error) {
        // Handle error
        console.error("Error executing query:", error);
        throw error; // Rethrow the error or handle as appropriate
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

export async function insertuser(password,aadhar,PAN_card,phone_no,email,dob,name){
    try{
    const [query_res1] = await pool.query("SELECT MAX(user_id) as id FROM user;");
    const newid = (query_res1[0].id) + 1
    const [insertResult] = await pool.query(`
            INSERT INTO user (user_id, email, password, PAN_card, aadhar, DateOfBirth, created_at, phone_no,name)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?,?);
        `, [newid, email, password, PAN_card, aadhar, '1990-01-15','2024-02-10 06:30:00', phone_no,name]);

        // Return the result of the insertion
    return insertResult;
    // const [query_res] = await pool.query(`
    //                                     INSERT INTO user VALUES (${newid},${email},${password},${PAN_card},${aadhar},'1990-01-15','2024-02-10 06:30:00',${phone_no})`);
    // return query_res;
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

// export async function get_watchlist(){
//     const [query_res] = await pool.query(`
//                                         Select email,user_id from 
//                                         user NATURAL JOIN portfolio
//                                         WHERE total_loss_gain>=${mn};`);
//     return query_res;
// }
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
        VALUES (?, ?,?, "sell",?)
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
// const ans = await get_loss_gain(1000);
// const new_admin = await addAdmin("admin14","tp");

// console.log(ans)
// pool.end();