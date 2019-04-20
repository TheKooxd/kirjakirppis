import * as notice from "../db/notice";
import * as bookdb from "../db/book";
import * as user from "../db/user";
import _ from "lodash";

export const createSellNotice = async (
  req: any,
  res: any,
  pool: any,
  price: string,
  closes: string,
  book: string,
  allowOffers: boolean,
  condition: any,
  markings: boolean
) => {
  const client = await pool.connect();
  try {
    bookdb.getById(book, client).then((bookresponse: any) => {
      if (bookresponse.rows.length > 0) {
        notice
          .set(
            {
              seller: req.session.user.id,
              price,
              closes,
              status: "open",
              opened: Math.floor(Date.now() / 1000),
              book,
              allowOffers,
              condition,
              markings
            },
            client
          )
          .then(() => res.status(200).send("ok"))
          .catch(() => res.status(503).send("cant set"));
      } else {
        res.status(503).send("cant find the book");
      }
    });
  } catch {
    res.sendStatus(500);
  } finally {
    client.release();
  }
};

export const getSellNotice = async (
  req: any,
  res: any,
  pool: any,
  id: string
) => {
  const client = await pool.connect();
  try {
    id
      ? notice
          .getById(id, client)
          .then((response: any) => res.status(200).send(response.rows[0]))
          .catch(() => res.status(503).send())
      : notice
          .getAll(client)
          .then((response: any) => res.status(200).send(response.rows))
          .catch(() => res.status(503).send());
  } catch {
    res.sendStatus(500);
  } finally {
    client.release();
  }
};

export const getUsersSellNotice = async (req: any, res: any, pool: any) => {
  const client = await pool.connect();
  try {
    notice
      .getWhereSeller(client, req.session.user.id)
      .then((asSeller: any) => {
        notice
          .getWhereBuyer(client, req.session.user.id)
          .then((asBuyer: any) => {
            res
              .status(200)
              .send({ asSeller: asSeller.rows, asBuyer: asBuyer.rows });
          })
          .catch(() => res.status(503).send());
      })
      .catch(() => res.status(503).send());
  } catch {
    res.sendStatus(500);
  } finally {
    client.release();
  }
};

export const acceptSellNotice = async (
  req: any,
  res: any,
  pool: any,
  id: string
) => {
  const client = await pool.connect();

  try {
    notice
      .getById(id, client)
      .then((response: any) => {
        if (
          response.rows[0].sellnotice.status === "open" &&
          response.rows[0].sellnotice.buyer === null &&
          response.rows[0].sellnotice.finalprice === null &&
          response.rows[0].sellnotice.seller.id === req.session.user.id
        ) {
          const maxOffer: any = _.maxBy(
            response.rows[0].sellnotice.offers,
            "offer"
          );
          notice
            .buy(id, maxOffer.offerer.id, maxOffer.offer, client)
            .then(() => {
              res.status(200).send("ok");
            })
            .catch((err: any) => res.status(500).send(err));
        } else {
          res.status(403).send("Book is already bought by someone!");
        }
      })
      .catch(() => res.status(500).send("not found"));
  } catch {
    res.sendStatus(500);
  } finally {
    client.release();
  }
};

export const buySellNotice = async (
  req: any,
  res: any,
  pool: any,
  id: string
) => {
  const client = await pool.connect();
  try {
    notice
      .getById(id, client)
      .then((response: any) => {
        if (
          response.rows[0].sellnotice.status === "open" &&
          response.rows[0].sellnotice.buyer === null
        ) {
          notice
            .buy(
              id,
              req.session.user.id,
              response.rows[0].sellnotice.price,
              client
            )
            .then(() => {
              res.status(200).send("ok");
            })
            .catch((err: any) => res.status(500).send(err));
        } else {
          res.status(403).send("Book is already bought by someone!");
        }
      })
      .catch(() => res.status(503).send());
  } catch {
    res.sendStatus(500);
  } finally {
    client.release();
  }
};

export const bidSellNotice = async (
  req: any,
  res: any,
  pool: any,
  id: string,
  price: any
) => {
  const client = await pool.connect();
  try {
    notice
      .getById(id, client)
      .then((response: any) => {
        if (response.rows[0].sellnotice.status === "open") {
          notice
            .bid(id, req.session.user.id, price, client)
            .then(() => {
              res.status(200).send("ok");
            })
            .catch((err: any) => res.status(500).send(err));
        } else {
          res.status(403).send();
        }
      })
      .catch(() => res.status(503).send());
  } catch {
    res.sendStatus(500);
  } finally {
    client.release();
  }
};

export const getBook = async (req: any, res: any, pool: any, id: string) => {
  const client = await pool.connect();
  try {
    id
      ? bookdb
          .getById(id, client)
          .then((response: any) => res.status(200).send(response.rows[0]))
          .catch(() => res.status(503).send())
      : bookdb
          .getAll(client)
          .then((response: any) => res.status(200).send(response.rows))
          .catch(() => res.status(503).send());
  } catch {
    res.sendStatus(500);
  } finally {
    client.release();
  }
};

export const getUser = async (req: any, res: any, pool: any, id: string) => {
  const client = await pool.connect();
  try {
    user
      .getById(id, client)
      .then((response: any) => res.status(200).send(response.rows[0]))
      .catch(() => res.status(503).send());
  } catch {
    res.sendStatus(500);
  } finally {
    client.release();
  }
};
