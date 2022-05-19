import { database } from "./db.js";


class UserRepository {

  async selectUser(email, password) {
      const bd = await database.connect();
      //console.log("select * from" + ' "user" '+ " WHERE login='" + email +"' AND senha='" + password + "';");
      const res = await bd.query("select * from" + ' "user" '+ " WHERE login='" + email +"' AND senha='" + password + "';");
      return res.rows;
  }

}

export const userRepository = new UserRepository();
