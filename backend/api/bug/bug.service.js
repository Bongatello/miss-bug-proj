import fs from 'fs'
import { makeId, readJsonFile, writeJsonFile } from '../../services/util.service.js'

const bugs = readJsonFile('data/bugs.json')

export const bugService = {
    showBugId,
    add,
    remove,
    showAllBugs,
    edit,
}

async function showAllBugs() {
    return bugs
}

async function showBugId(bugId){

    const bug = bugs.find(bug => bug._id === bugId)

    return bug

}

async function remove(bugId) {

    
    const idx = bugs.findIndex(bug => bug._id === bugId)

    bugs.splice(idx, 1)

    return bugs

}

async function add(queryObject){
    const { title, severity, desc } = queryObject
    const bugToSave = { title, severity: +severity, desc }
    console.log(bugToSave)

    console.log('trying to add bug')
    bugToSave._id = makeId()
    bugToSave.createdAt = Date.now()
    console.log('new bug ', bugToSave)
    bugs.push(bugToSave)
    console.log('bug was added')
    return _saveBugs()

}

async function edit(queryObject){
    const { _id, title, severity, desc } = queryObject
    const bugToSave = { _id, title, severity: +severity, desc }

    console.log('Backend BugService: Trying to edit bug: ',bugToSave)
    const bug = bugs.find(bug => bug._id === bugToSave._id)

    if (bugToSave.title) bug.title = bugToSave.title    //in case title wasnt passed, the api would not overwrite the title with a blank field
    if (bugToSave.severity) bug.severity = bugToSave.severity   //same as title but with severity
    if (bugToSave.desc) bug.desc = bugToSave.desc   //same as title but with desc
    
    console.log('bug was edited')
    return _saveBugs()
}



function _saveBugs() {
    return writeJsonFile('data/bugs.json', bugs)
}