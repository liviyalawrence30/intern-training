const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

const filePath = path.join(__dirname, 'data.json');

const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);

  const raw = fs.readFileSync(filePath, 'utf8');
  const users = JSON.parse(raw);

  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'GET' && req.url === '/users') {
    res.writeHead(200);
    return res.end(JSON.stringify(users, null, 2));
  }

  if (req.method === 'GET' && req.url === '/users/top') {
    const topUsers = users.filter(user => user.score >= 90);
    res.writeHead(200);
    return res.end(JSON.stringify(topUsers, null, 2));
  }

  if (req.method === 'GET' && req.url.startsWith('/users/')) {
    const id = parseInt(req.url.split('/')[2]);

    const user = users.find(user => user.id === id);

    if (user) {
      res.writeHead(200);
      return res.end(JSON.stringify(user, null, 2));
    }

    res.writeHead(404);
    return res.end(JSON.stringify({ error: 'User not found' }, null, 2));
  }
  if (req.method === 'GET' && req.url === '/health') {
  const health = 
{
  "status": "ok",
  "platform": os.platform(),
  "memory": {
    totalMB: Math.round(os.totalmem()/(1024*1024)),
    freeMB: Math.round(os.freemem()/(1024*1024))
  },
  uptime:Number(process.uptime().toFixed(1))

  };
  res.writeHead(200);
 return res.end(JSON.stringify(health, null, 2));
}

  

  res.writeHead(404);
  res.end(JSON.stringify({ error: 'Route not found' }, null, 2));
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});

/*
Health check points let monitoring tools check if a server is running and healthy.
Tools like Docker,Kubernetes and load balancers use them to detect problems and restart/reroute traffic if needed.
*/