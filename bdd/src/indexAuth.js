import { connectSQlite } from '../db/openDb.js'
import { FactoryDB } from '../db/database.js'
import { UserRepository } from './class/User/userRepository.js'

import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import asyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

const factoryDb  = new FactoryDB(await connectSQlite())
const userDAO = factoryDb.createUserDAO()
const rtDAO = factoryDb.createRefreshTokenDAO()
const rDAO = factoryDb.createRoleDAO()
const userRepository = new UserRepository(userDAO, rDAO, rtDAO)

const app = express();

app.use(morgan('tiny'));
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.json({
        message: 'Behold The MEVN Stack!'
    });
});

//Authentifie l'utilisateur grâce à son mot de passe et si valide, retourne un access et refresh token
app.post('/login', asyncHandler(async (req, res, next) => {
    const username = req.body.username
    const userBuf = await userRepository.getUser(req.body.username) 
    if(userBuf.getPwd() !== req.body.password)
        return res.sendStatus(403)
    const obj = {name: username, roles: userBuf.getRoles()}
    const at = generateAccessToken(obj)
    const rt = jwt.sign(obj, process.env.REFRESH_TOKEN)
    await userRepository.setRefreshToken(rt)
    res.send({accessToken: at, refreshToken: rt})
}))

//Verifie si le refreshToken est toujours dans la table, sinon alors ce dernier est invalide
app.post('/token', asyncHandler(async (req, res, next) => {
    let refreshTokens = await userRepository.getAllRefreshToken()
    const rt = req.body.token
    if(rt == null)
        return res.sendStatus(401)
    if(!refreshTokens.includes(rt))
        return res.sendStatus(403)
    jwt.verify(rt, process.env.REFRESH_TOKEN, (err, user)=>{
        if(err)
            return res.sendStatus(403)
        const at = generateAccessToken(user)
        res.send({accessToken: at})
    })
}))
//Invalide le refreshToken en le supprimant de la table
app.delete('/logout',asyncHandler(async (req, res, next) => {
    await userRepository.deleteRefreshToken(req.body.token)
    res.sendStatus(204)
}))

function generateAccessToken(obj){
    return jwt.sign(obj, process.env.ACCESS_TOKEN, {expiresIn: '10m'})
}

app.use((err, req, res, next) => {
    res.send({ error : err.message })
})

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`listening on ${port}`);

});



