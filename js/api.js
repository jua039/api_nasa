
import http from "http";
const PORT = 3000;
const API_KEY = 'fpqMkLeLbDf4zQAe6KIYiB41quINApKVGc9baAHu'



const server = http.createServer(async(req, res) =>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS' );
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
}
const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
    
    if (parsedUrl.pathname === '/api/apod' && req.method === 'GET') {
        const date = parsedUrl.searchParams.get('date');

        const nasaUrl = `https://api.nasa.gov/planetary/apod?api_key=${API_KEY}${date ? `&date=${date}` : ""}`;

        try {
            const response = await fetch(nasaUrl);
            const data = await response.json();
        
            if (!response.ok) {
                res.writeHead(response.status);
                res.end(JSON.stringify(data));
                return;
            }
            res.writeHead(200);
            res.end(JSON.stringify(data)); 

        } catch (error) {
            console.error("Error conectando con NASA:", error);

            res.writeHead(500);
            res.end(JSON.stringify({ error: 'Error al conectar con la NASA' }));
        }
    } else {
        res.writeHead(404);
        res.end(JSON.stringify({ error: 'Ruta no encontrada' }));
    }
});

server.listen(PORT, () => {
    console.log(`Servidor nativo corriendo en http://localhost:${PORT}`);
});





   