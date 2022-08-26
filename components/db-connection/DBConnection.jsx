const mysql = require('mysql');
const util = require('util');
const SQL = require('sql-template-strings');

const pool = mysql.createPool({
    connectionLimit : 100, //important
    host: 'volunteer-db.cckitchen-app.uk',
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: 'cckrota'
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