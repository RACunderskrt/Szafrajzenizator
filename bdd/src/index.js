import { pool } from '../db/db.js'

import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import morgan from 'morgan'


const app = express();

app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.json({
        message: 'Behold The MEVN Stack!'
    });
});

app.get('/debut', (req, res) => {
    res.json({
        message: 'bienvenu sur l\'api de ses morts'
    });
});

app.get('/names', async (req, res) => {
    let request = "SELECT * FROM test ORDER BY id DESC"
    const result = await pool.query(request)
    res.json(result.rows);
});

app.post('/names', async (req, res) => {
    let request = `INSERT INTO test(names, date) VALUES('${req.body.names}','${req.body.date}')`
    console.log(request)
    const result = await pool.query(request);
    res.json(result);
});



const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`listening on ${port}`);

});



