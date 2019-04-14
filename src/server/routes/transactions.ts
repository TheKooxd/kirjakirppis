import { login } from "../middleware/auth";

const transactionRoutes = (app: any, pool: any) => {
    app.get('*', (req: any, res: any, next: any) => req.session.loggedIn ? next() : res.send(403));
    app.post('/sellNotice', (req: any, res: any) => res.send('moi'))
  };
  
  export default transactionRoutes;
  