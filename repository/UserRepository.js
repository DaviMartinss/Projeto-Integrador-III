import { database } from "./db.js";


class UserRepository {

  async selectUser() {
      const bd = await database.connect();
      const res = await bd.query('select * from "user";');
      return res.rows;
  }

}

export const userRepository = new UserRepository();
