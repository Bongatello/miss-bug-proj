import express from 'express'
import fs from 'fs'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import path from 'path'

import { bugRoutes } from './api/bug/bug.routes.js'
import { userRoutes } from './api/user/user.routes.js'

const app = express()

const corsOptions = {
    origin: [
        'http://127.0.0.1:5173',
        'http://localhost:5173',
        'http://127.0.0.1:5174',
        'http://localhost:5174',
    ],
    credentials: true,
}

app.use(cors(corsOptions))
app.use(cookieParser())
app.use(express.json())
app.use(express.static('public'))

app.use(bugRoutes)
app.use(userRoutes)

app.get('/', (req, res) => res.send('Hello there'))



//app.get('*all', (req, res) => {
//    res.sendFile(path.resolve('public/index.html'))
//})

app.listen(3030, () => console.log('Server ready at port 3030'))