import express from "express";
import bodyParser from "body-parser";
import authWithMicrosoft from "./server/middleware/auth";
import { Pool } from "pg";
import session from "express-session";
import cors from "cors";

import adminRoutes from "./server/routes/admin";
import authRoutes from "./server/routes/auth";
import sellNoticeRoutes from "./server/routes/sellNotices";

const pool = new Pool({
  max: parseInt(process.env.POOL_SIZE as string, 10) || 30
});

const app = express();
app.use(
  cors({
    origin: "http://localhost:3001",
    credentials: true,
    methods: "GET, PUT, POST"
  })
);
const sess = {
  secret: "Aklqwoptjnj218",
  cookie: {
    maxAge: 1800000
  },
  resave: false
};
app.use(bodyParser.json());
app.use(session(sess));
authRoutes(app, pool);
app.use("*", (req: any, res: any, next: any) =>
  req.session.loggedIn ? next() : res.send(403)
);
sellNoticeRoutes(app, pool);
adminRoutes(app, pool);

export default app;
