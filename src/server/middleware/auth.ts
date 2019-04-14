import office365Auth from 'office365-nodejs-authentication';
import * as user from '../db/user';

const authWithMicrosoft = (username: string, password: string) => new Promise((resolve: any, reject: any) => {
  office365Auth(username, password, null, (error: any, info: any) => {
    if(error) reject(false);
    else resolve(true);
    })
  });

export const login = async (username: string, password: string, res: any, pool: any, req: any) => {
  const client = await pool.connect();
  try {
    const databaseResponse = await user.get(username, client);
    if(databaseResponse.rows.length > 0) {
      authWithMicrosoft(username, password)
      .then((response) => {
        req.session.loggedIn = true;
        response ? res.sendStatus(200) : res.sendStatus(403);
      })
      .catch((err) => res.sendStatus(500))
    } else {
      authWithMicrosoft(username, password)
      .then((response) => {
        user.set({email: username, name: username.match(/^([^@]*)@/)[1]}, client)
        .then(() => {
          req.session.loggedIn = true;
          res.sendStatus(201)
        })
        .catch(() => res.sendStatus(503));
      })
      .catch(err => res.sendStatus(201));
    }
  } catch {
    res.sendStatus(500);
  } finally {
    client.release();
  }
};


export default authWithMicrosoft;
