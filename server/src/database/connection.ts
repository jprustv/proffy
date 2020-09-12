import knex from 'knex'
import path from 'path'

const db = knex({
  client : 'sqlite3',
  connection : {
    filename : path.resolve(__dirname, 'database.sqlite')
  },
  useNullAsDefault : true,
})

db.on('query', (query) => {
  // console.log do query executado, em amarelo
  console.log('\x1b[33m%s\x1b[0m', query.sql);
})

export default db
