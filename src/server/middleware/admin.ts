import * as book from '../db/book';

export const createBook = async (res: any, pool: any, name: string, ean: string, writers: string[], producer: string, marketPrice: number) => {
  const client = await pool.connect();
  console.log(marketPrice)
    try {
        book.set({name, ean, writers, producer, marketPrice}, client)
        .then(() => res.status(200).send())
        .catch(() => res.status(503).send());
    } catch {
        res.sendStatus(500);
    } finally {
        client.release();
    }
    };