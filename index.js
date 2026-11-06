const http = require('http');
const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok', memory: process.memoryUsage() }));
    return;
  }
  if (req.url === '/allocate') {
    const buffers = [];
    try {
      for (let i = 0; i < 24; i++) {
        buffers.push(Buffer.alloc(50 * 1024 * 1024, 'a')); // ~1.2 GB
      }
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ status: 'allocated', count: buffers.length }));
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: err.message }));
    }
    return;
  }
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('WWS Cloud Big Memory QA App\n');
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
