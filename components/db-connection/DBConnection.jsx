const mysql = require('mysql2');
const util = require('util');
const SQL = require('sql-template-strings');

const pool = mysql.createPool({
    connectionLimit : 100, //important
    host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME
});

pool.asyncQuery = async (qString) => {
	const query = util.promisify(pool.query).bind(pool);
	return await query(qString);
}

pool.getUserByEmail = async (email) => {
	let qString = SQL`SELECT * FROM person WHERE email = ${email}`; 
	return await pool.asyncQuery(qString);
}	

export default pool;