import fs from 'fs'
import { makeId, readJsonFile, writeJsonFile } from './util.service.js'

const bugs = readJsonFile('data/bugs.json')

export const bugService = {
    showBugId,
    save,
    remove,
    showAllBugs,
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

async function save(queryObject){
    const { _id, title, severity } = queryObject
    const bugToSave = { _id, title, severity: +severity }

    if (bugToSave._id) {
        const bug = bugs.find(bug => bug._id === bugToSave._id)
        
        if (bugToSave.title) bug.title = bugToSave.title    //in case title wasnt passed, the api would not overwrite the title with a blank field
        if (bugToSave.severity) bug.severity = bugToSave.severity   //same as title but with severity

        return _saveBugs()
    }

    else {
        bugToSave._id = makeId()
        bugToSave.createdAt = Date.now()
        bugs.push(bugToSave)
        return _saveBugs()
    }
}


function _saveBugs() {
    return writeJsonFile('data/bugs.json', bugs)
}