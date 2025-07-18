// Import the database package
import Database from 'better-sqlite3';

import path from 'path';

// Criar caminho para interagir com a database
const dbPath = path.join(process.cwd(),'db','database.sqlite');

// Cria ou abre a database
const db = new Database(dbPath);


// Tabela de credenciais de acesso do user
const makeUsersTable = `
	CREATE TABLE IF NO EXISTS users (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		username TEXT NOT NULL UNIQUE,
		password_hash TEXT NOT NULL
	);
`:

db.prepare(makeUsersTable).run();

//Tabela das credenciais para cada website
const makeWebLoginTable = `
	CREATE TABLE IF NO EXISTS credentials (
		id INTEGER PRIMARY KEY AUTOINCREMENT,
		user_id INTERGER NOT NULL,
		website TEXT NOT NULL,
		loginUsername TEXT NOT NULL,
		encrypted_password TEXT NOT NULL,
		FOREIGN KEY(user_id) REFERENCES users(id)
	);
`;

db.prepare(makeWebLoginTable).run();

console.logs('Database Initialized');

export default db;
