import { userService } from "./user.service.js"

export async function getAllUsers (req, res) {
    const users = await userService.showAllUsers()
    res.send(users)
}

export async function getUserById(req, res) {
    const userId = req.params.userId
    const user = await userService.showUserId(userId)
    res.send(user)
}

export async function addUser(req, res) {
    const users = await userService.add(req.body)    
    res.send(users)
}

export async function updateUser(req, res) {
    const users = await userService.edit(req.body)    
    res.send(users)
}

export async function deleteUser(req, res) {
    const userId = req.params.userId
    await userService.remove(userId)
    res.send('Removed User!')
}

export async function checkIfLimited(req, res) {
    let visitedBugs = req.cookies.visitedBugs || []
    if (visitedBugs.length>2) res.send(true)
    
    else res.send(false)
}

export async function addBugToCookies(req, res) {
    let visitedBugs = req.cookies.visitedBugs || []
    const visitedBug = req.params.bugId

    if (visitedBugs.length>2) res.send(1)

    if (!visitedBugs.includes(visitedBug)) {
        visitedBugs.push(visitedBug)

        res.cookie('visitedBugs', visitedBugs)
        console.log('added a visited bug, visitedBugs: ', visitedBugs)
    }

    if (visitedBugs.includes(null)) {
        const idx = visitedBugs.indexOf(null)
        visitedBugs.splice(idx, 1)
        res.cookie('visitedBugs', visitedBugs)
    }

    res.send(`<h1>Visited Bugs: ${visitedBugs}`)
}