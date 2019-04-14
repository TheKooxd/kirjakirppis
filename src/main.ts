import express from 'express';
import bodyParser from 'body-parser';
import authWithMicrosoft from './server/middleware/auth';
import { Pool } from 'pg';
import session from 'express-session';

import adminRoutes from './server/routes/admin';
import authRoutes from './server/routes/auth';
import transactionRoutes from './server/routes/transactions';

const pool = new Pool({
    max: parseInt(process.env.POOL_SIZE as string, 10) || 30,
  });

const app = express();

const sess = {
    secret: 'Aklqwoptjnj218',
    cookie: {
      maxAge: 1800000,
    },
    resave: false,
  };
  
app.use(session(sess));
app.use(bodyParser.json({ limit: '50mb' }));
    app.get('/test', (req: any, res: any) => req.session.loggedIn ? res.send('sisällä') : res.send('ulkona'));
app.get('/auth', (req: any, res: any) => authWithMicrosoft(req.query.username, req.query.password).then(status => status && res.send(200)).catch(() => res.send(403)));
authRoutes(app, pool);
adminRoutes(app, pool);
transactionRoutes(app, pool);


export default app;
