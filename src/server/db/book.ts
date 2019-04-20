export const getById = (id: string, client: any) =>
  client.query(`SELECT * FROM books WHERE id = '${id}'`);

export const getAll = (client: any) =>
  client.query(`SELECT * FROM books`);

export const set = (data: any, client: any) => 
  client.query(setBookQuery, [
    data.name,
    data.ean,
    data.writers,
    data.producer,
    data.marketPrice
  ]);

const setBookQuery = `
  INSERT INTO books (name, ean, writers, producer, marketprice)
  VALUES (
    $1,
    $2,
    $3,
    $4,
    $5
  )
`;
