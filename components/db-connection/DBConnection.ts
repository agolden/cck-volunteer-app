import mysql from 'mysql2';
import util from 'util';
import SQL from 'sql-template-strings';


const dbPool = mysql.createPool({
    connectionLimit : 100, //important
    host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME
});

async function asyncQuery(qString) {
	const query = util.promisify(dbPool.query).bind(dbPool);
	return await query(qString);
}

export async function getUserRoles(personId) {

	const qString = SQL`
		SELECT system_role.role as role, organization.id_ref AS 'orgRef' FROM person
		INNER JOIN person_system_role ON person.id = person_system_role.id_person
		INNER JOIN system_role ON system_role.id = person_system_role.id_role
		LEFT JOIN organization ON organization.id = person_system_role.id_organization
		WHERE person.id = ${personId}
	`;
	
	const response = {};
	const rows = await asyncQuery(qString);

	response['roles'] = rows.filter(row => row.orgRef == null)
						.map((row) => row.role);

	const orgRoles = rows.filter(row => row.orgRef !== null);
	const a = orgRoles.map(row => row.orgRef);
	const orgRefs = a.filter((item, i, ar) => ar.indexOf(item) === i);

	for (const i in orgRefs) {
		if (!response['organizations']) { response['organizations'] = {}; }
		const org = {};
		org['roles'] = rows.filter(row => row.orgRef == orgRefs[i])
						.map((row) => row.role);
		response['organizations'][orgRefs[i]] = org;
	}

	return response;
}

export async function getUserByEmail(email) {
	const qString = SQL`SELECT * FROM person WHERE email = ${email}`; 
	return await asyncQuery(qString);
}

export async function getUserByEmailorNickname(email, nickname) {
	const qString = SQL`SELECT * FROM person WHERE (email = ${email} OR nickname = ${nickname} )`; 
	return await asyncQuery(qString);
}

export async function createUser({email, totpsecret, nickname}) {
	const qString = SQL`INSERT INTO person(email, totpsecret, nickname) VALUES(${email}, ${totpsecret}, ${nickname})`; 
	return await asyncQuery(qString);
}

export async function getEventByIdOrRef(id, id_ref) {
	const identifyingField = id ? 'id' : 'id_ref';
	const idValue = id ? id : id_ref;

	const qString = SQL`
		SELECT * FROM event
		WHERE person.${identifyingField} = ${idValue}
	`;
	return await asyncQuery(qString);
}