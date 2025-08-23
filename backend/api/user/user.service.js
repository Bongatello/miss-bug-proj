import fs from 'fs'
import { makeId, readJsonFile, writeJsonFile } from '../../services/util.service.js'

const users = readJsonFile('data/users.json')

export const userService = {
    showUserId,
    add,
    remove,
    showAllUsers,
    edit,
}

async function showAllUsers() {
    return users
}

async function showUserId(userId){

    const user = users.find(user => user._id === userId)

    return user

}

async function remove(userId) {

    
    const idx = users.findIndex(user => user._id === userId)

    users.splice(idx, 1)

    return users

}

async function add(queryObject){
    const { fullname, username, password, score } = queryObject
    const userToSave = { fullname, username, password, score: +score }
    console.log('trying to add user')
    userToSave._id = makeId()
    console.log('new user ', userToSave)
    users.push(userToSave)
    console.log('user was added')
    return _saveUsers()

}

async function edit(queryObject){
    const { _id, fullname, score, password } = queryObject
    const userToSave = { _id, fullname, score: +score, password }

    console.log('Backend UserService: Trying to edit user: ',userToSave)
    const user = users.find(user => user._id === userToSave._id)

    if (userToSave.fullname) user.fullname = userToSave.fullname    
    if (userToSave.score) user.score = userToSave.score   
    if (userToSave.password) user.password = userToSave.password   
    
    console.log('user was edited')
    return _saveUsers()
}



function _saveUsers() {
    return writeJsonFile('data/users.json', users)
}