import { bugService } from "./bug.service.js"

export async function getQueriedBugs (req, res) {
    const queryParams = req.query
    const bugs = await bugService.showQueriedBugs(queryParams)
    res.send(bugs)
}

export async function getBugById(req, res) {
    const bugId = req.params.bugId
    const bug = await bugService.showBugId(bugId)
    res.send(bug)
}

export async function addBug(req, res) {
    const bugs = await bugService.add(req.body)    
    res.send(bugs)
}

export async function updateBug(req, res) {
    const bugs = await bugService.edit(req.body)    
    res.send(bugs)
}

export async function deleteBug(req, res) {
    const bugId = req.params.bugId
    const bugs = await bugService.remove(bugId)
    res.send('Removed Bug!')
}

export async function getBugLabels(req, res) {
    const bugLabels = await bugService.setBugLabels()
    res.send(bugLabels)
}