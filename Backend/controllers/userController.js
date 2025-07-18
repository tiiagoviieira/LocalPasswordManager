// Import functions

import {getAllUsers, createUser} from '../models/userModel.js';

// Fazer request dos users
export async function handleGetUsers(req,res) {
	try {
		// Pedir lista de users
		const users = await getAllUsers(); 
		res.writeHead(200,{'Content-Type':'application/json'});
		res.end(JSON.stringify(users));
	} catch (err) {
		// Resolver error de request
		res.writeHead(500,{'Content-Type':'application/json'});
		res.end(JSON.stringify({error : 'Failed to load users'}));
	}
}

// Fazer request de criação dos users
export async function handCreateUser(req, res, body) {
	try{
		// Se valor não tiver nome ou variavel não seja do tipo sting da erro
		if (!body.name || typeof body.name !== 'string' ) {
			res.writeHead(400, {'Content-Type':'application/json'});
			res.end(JSON.stringify({error: 'Invalid user data'}));
		}
		// Criar novo user
		const newUser = await createUser(body);
		res.writeHead(201,{'Content-Type':'application/json'});
		res.end(JSON.stringify(newUser));
	} catch (err) {
		// Resolver erro de request
		res.writeHead(500,{'Content-Type':'application/json'});
		res.end(JSON.stringify({error : 'Failed to create user'}));
	}
}
