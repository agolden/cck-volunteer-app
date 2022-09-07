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
};

pool.getUserRoles = async (personId) => {
	let qString = SQL`SELECT role.role FROM person, person_role, role WHERE person.id=person_role.id_person AND role.id=person_role.id_role AND person.id = ${personId}`;
	let rows = await pool.asyncQuery(qString);
	return rows.map((row) => row.role);
}

pool.getUserByEmail = async (email) => {
	let qString = SQL`SELECT * FROM person WHERE email = ${email}`; 
	return await pool.asyncQuery(qString);
};

pool.getUserByEmailorNickname = async (email, nickname) => {
	let qString = SQL`SELECT * FROM person WHERE (email = ${email} OR nickname = ${nickname} )`; 
	return await pool.asyncQuery(qString);
};

pool.createUser = async ({email, totpsecret, nickname}) => {
	let qString = SQL`INSERT INTO person(email, totpsecret, nickname) VALUES(${email}, ${totpsecret}, ${nickname})`; 
	return await pool.asyncQuery(qString);
};

export default pool;