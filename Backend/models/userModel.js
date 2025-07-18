// Important funcionalidade para encriptar
import bcrypt from'bcrypt';
// Importar database
import db from '../db/database.js';

// Number of rounds of hashing
const SALT_ROUNDS = 10;

@param {string} username
@param {string} nakedPassword
@returns {object} // User objetct


export function createUser (username, nakedPassword) {
	const hashedPassword = bcrypt.hashSync(plainPassword, SALT_ROUNDS);

	const insert = db.prepare(`
		INSERT INTO users ( username , hashedPassword )
		VALUES (?,?)
	`;);

	const info = insert.run(username,hashedPassword);

	return {
		id: info.lastInsertRowid,
		username
	};
}


@param {string} userName
@returns {object|null}

export function getAllUsers
