export const get = async (username: string, client: any) =>
  client.query(`SELECT * FROM users WHERE email = '${username}'`);

export const getById = async (id: string, client: any) =>
  client.query(`SELECT * FROM users WHERE id = '${id}'`);

export const set = (data: any, client: any) =>
  client.query(setUserQuery, [
    data.name,
    data.email,
    data.phone,
    data.snapchat
  ]);

const setUserQuery = `
  INSERT INTO users (name, email, phone, snapchat)
  VALUES (
    $1,
    $2,
    $3,
    $4
  )
`;
