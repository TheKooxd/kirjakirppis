import { createBook } from '../middleware/admin';

const adminRoutes = (app: any, pool: any) => {
  app.post('/newBook', (req: any, res: any) => createBook(res, pool, req.body.name, req.body.ean, req.body.writers, req.body.producer, req.body.marketPrice))
  app.get('*', (req: any, res: any) => res.sendStatus(404),
  );
};

export default adminRoutes;
