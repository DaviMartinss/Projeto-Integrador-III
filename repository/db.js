import pkg from 'pg';
const { Pool } = pkg;


//const { Client } = require('pg');

class Database{

  async connect() {
      if (global.connection)
          return global.connection.connect();

      const pool = new Pool({
          user: 'seu usuario',
          host: '',
          database: 'bd_pedemeia',
          password: 'sua senha',
          port: 5432,
      });

      //apenas testando a conexão
      const user = await pool.connect();
      console.log("Criou pool de conexões no PostgreSQL!");

      const res = await user.query('SELECT NOW()');
      console.log(res.rows[0]);
      user.release();

      //guardando para usar sempre o mesmo
      global.connection = pool;
      return pool.connect();
  }
}

export const database = new Database();
//module.exports = { selectUser }
