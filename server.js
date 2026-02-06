const jsonServer = require('json-server');

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults({
  static: './build',
});

const port = process.env.PORT || 3001;

// ✅ Health check for Railway
server.get('/', (req, res) => {
  res.send('API is running');
});

// ✅ Enable CORS
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization, Cache-Control'
  );
  res.header('Access-Control-Allow-Methods', 'DELETE, GET, POST, PUT, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  next();
});

server.use(middlewares);

// ✅ API routes
server.use('/api', router);

// ✅ Listen on Railway port
server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});
