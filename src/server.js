require('dotenv').config();
const app = require('./app');
const connection = require('./db/connection');

app.listen(3001, async () => {
    //  const [result] = await connection.execute('SELECT 1');
     const [result] = await connection.execute('SELECT * FROM missions');     
    if (result) console.log('MySql Connection Ok!');
    // console.log('Back-end rodando na 3001');
});