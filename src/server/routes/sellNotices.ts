import {
  acceptSellNotice,
  createSellNotice,
  getSellNotice,
  getUsersSellNotice,
  buySellNotice,
  bidSellNotice,
  getBook,
  getUser
} from "../middleware/notices";

const transactionRoutes = (app: any, pool: any) => {
  app.get("/book", (req: any, res: any) =>
    getBook(req, res, pool, req.params.id)
  );
  app.get("/book/:id", (req: any, res: any) =>
    getBook(req, res, pool, req.params.id)
  );
  app.get("/sellNotice/me", (req: any, res: any) =>
  getUsersSellNotice(
    req,
    res,
    pool,
  )
);
  app.get("/sellNotice", (req: any, res: any) =>
    getSellNotice(req, res, pool, req.params.id)
  );
  app.get("/sellNotice/:id/accept", (req: any, res: any) =>
    acceptSellNotice(req, res, pool, req.params.id)
  );
  app.get("/sellNotice/:id", (req: any, res: any) =>
    getSellNotice(req, res, pool, req.params.id)
  );
  app.post("/sellNotice", (req: any, res: any) =>
    createSellNotice(
      req,
      res,
      pool,
      req.body.price,
      req.body.closes,
      req.body.book,
      req.body.allowOffers,
      req.body.condition,
      req.body.markings
    )
  );
  app.post("/sellNotice/:id/buy", (req: any, res: any) =>
    buySellNotice(req, res, pool, req.params.id)
  );
  app.post("/sellNotice/:id/bid", (req: any, res: any) =>
    bidSellNotice(req, res, pool, req.params.id, req.body.bid)
  );
  app.get("/user/:id", (req: any, res: any) =>
    getUser(req, res, pool, req.params.id)
  );
};

export default transactionRoutes;
