import { login } from "../middleware/auth";

const authRoutes = (app: any, pool: any) => {
    app.get('/me', (req: any, res: any) => req.session.loggedIn ? res.send(req.session.user) : res.status(403).send('No logins'));
    app.get('/login', (req: any, res: any) => login(req.query.username, req.query.password, res, pool, req));
  };
  
  export default authRoutes;
  