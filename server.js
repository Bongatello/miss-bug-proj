import express from 'express'
import fs from 'fs'
import { bugService } from './services/bug.service.js'
import { readJsonFile } from './services/util.service.js'


const app = express()

app.get('/', (req, res) => res.send('Hello there'))

app.get('/api/bug', async (req, res) => {
    const bugs = await bugService.showAllBugs()
    res.send(bugs)
})

app.get('/api/bug/save', async (req, res) => {

    const bugs = await bugService.save(req.query)    

    res.send(bugs)
})

app.get('/api/bug/:id', async (req, res) => {
    const bugId = req.params.id
    
    const bug = await bugService.showBugId(bugId)

    res.send(bug)
})

app.get('/api/bug/:bugId/remove', async (req, res) => {
    const bugId = req.params.id
    
    const bugs = await bugService.remove(bugId)

    res.send('Removed Bug!')
})


app.listen(3030, () => console.log('Server ready at port 3030'))