// Comtrolador
// Por agora apenas suporta estas
import {handleGetUsers, handleCreateUser} from '../controllers/userController.js';

async function parseBody(req) {
	return new Promise((resolve, reject) => {
		let body = '';	// Variavel para guardar informação
		req.on('data, chunk => (
			body += chunk;
		));	// Guarda informação recebida em chunks na variavel inicial
		req.on('end', () => {
			try {
				resolve(JSON.parse(body));
			} catch (err) {
				reject(new Error('Invalid JSON'));
			};
		});	// Valida informação
	});
}

export async function handleRequest(req, res) {
	const {method,url} = req;

	// Get users
	if (url === '/users' && method === 'GET') {
		return handleGetUsers(req,res);
	}

	// Create users
	if (url === '/users' && method === 'POST') {
		try {
			const body = await parseBody(req);
			return handleCreateUser(req,res,body);
		} catch (err) {
			res.writeHead(400, {'Content-Type': 'application/json'});
			return res.end(JSON.stringify({error : err.message}));
		}
	}

	// Pedido não conhecido
	res.writeHead(404, {'Content-Type':'application/json'});
	res.end(JSON.stringify({error: 'Route not found'}));
}


