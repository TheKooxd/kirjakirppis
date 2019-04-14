export const get = (name: string, client: any) =>
  client.query(`SELECT * FROM users WHERE name = '${name}'`);

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
