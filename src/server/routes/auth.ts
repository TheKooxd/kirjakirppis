import { login } from "../middleware/auth";

const authRoutes = (app: any, pool: any) => {
    app.get('/login', (req: any, res: any) => login(req.query.username, req.query.password, res, pool, req));
  };
  
  export default authRoutes;
  