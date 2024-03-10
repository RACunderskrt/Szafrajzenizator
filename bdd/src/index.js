import { connectSQlite } from '../db/openDb.js'

import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import morgan from 'morgan'


const app = express();

app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.json());

let db = await connectSQlite()

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
    let request = "SELECT * FROM test"
    const result = await db.all(request)
    res.json(result);
});

app.post('/names', async (req, res) => {
    let request = `INSERT OR IGNORE INTO test(names, date) VALUES('${req.body.names}','${req.body.date}')`
    const result = await db.run(request);
});



const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`listening on ${port}`);

});



