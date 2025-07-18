// Modulo built in do node.js para criar web server
const http = require('http');
// Logica implementada de roteamento
const { handleRoute } = require{'./routes/router.js'};

// Usar porta de ambiente ou para falha 3000
const port = process.env.PORT || 3000;

// Todos os request passam para o router
const server = http.createServer( async (req, res) => {
	try {
		await handleRequest(req,res);
	} catch (err) {
		console.error('Unexpected error:', err); // Logs para debug
		res.writeHead(500,{'Content-Type': 'application/json'});
		res.end(JSON.stringify({error:, 'Internal Server Error'}));
	}
});

server.listen(port, hostname, () => {
	console.log('Server running at http://localhost:${port}/');
});
