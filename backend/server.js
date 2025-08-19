import express from 'express'
import fs from 'fs'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import path from 'path'

import { bugService } from './services/bug.service.js'


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

app.get('/', (req, res) => res.send('Hello there'))

app.get('/api/bug', async (req, res) => {
    const bugs = await bugService.showAllBugs()
    res.send(bugs)
})

app.post('/api/bug/', async (req, res) => {
    const bugs = await bugService.add(req.body)    
    res.send(bugs)
})

app.put('/api/bug/:bugId', async (req, res) => {
    console.log(req.query)
    const bugs = await bugService.edit(req.query)    
    res.send(bugs)
})

app.get('/api/bug/:id', async (req, res) => {
    const bugId = req.params.id
    
    const bug = await bugService.showBugId(bugId)

    res.send(bug)
})

app.delete('/api/bug/:bugId', async (req, res) => {
    const bugId = req.params.id
    
    const bugs = await bugService.remove(bugId)

    res.send('Removed Bug!')
})


//app.get('*all', (req, res) => {
//    res.sendFile(path.resolve('public/index.html'))
//})

app.listen(3030, () => console.log('Server ready at port 3030'))