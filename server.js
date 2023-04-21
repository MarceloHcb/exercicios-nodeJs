require('dotenv').config();
const app = require('./app');
const connection = require('./src/models/connection');

const port = 3001;

app.listen(port, async () => {   
     const [result] = await connection.execute('SELECT * FROM missions');     
    if (result) console.log(`MySql Connection Ok! on ${port}`);
});