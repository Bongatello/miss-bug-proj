import { userService } from "./user.service.js"

export async function getAllUsers (req, res) {
    const users = await userService.showAllUsers()
    res.send(users)
}

export async function getUserById(req, res) {
    const userId = req.params.id
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
    const userId = req.params.id
    const users = await userService.remove(userId)
    res.send('Removed User!')
}