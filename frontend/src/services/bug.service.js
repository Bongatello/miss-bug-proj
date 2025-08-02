
import Axios from 'axios'

var axios = Axios.create({
    withCredentials: true,
})

const BASE_URL = '//localhost:3030/api/bug'

export const bugService = {
    query,
    getById,
    save,
    remove,
}



async function query(filterBy) {
    var { data: bugs } = await axios.get(BASE_URL)

    bugs = bugs.filter(bug => bug.severity>=filterBy)

    return bugs
}


async function getById(bugId) {
    const res = await axios.get(BASE_URL + '/' + bugId)
    return res.data
}


async function remove(bugId) {
    const res = await axios.get(BASE_URL + '/' + bugId + '/remove')
    return res.data
}


async function save(bug) {
    if (bug._id) {
        console.log('my existing bug id is' + bug._id)
        console.log(BASE_URL + '/save?_id=' + bug._id + '&title=' + bug.title + '&severity=' + bug.severity + '&desc=' + bug.desc)

        const res = await axios.get(BASE_URL + '/save?_id=' + bug._id + '&title=' + bug.title + '&severity=' + bug.severity + '&desc=' + bug.desc)
        return res.data
    } 
    
    else {
        console.log('my new bug id is' + bug._id)
        console.log(BASE_URL + '/save?title=' + bug.title + '&severity=' + bug.severity)
        const res = await axios.get(BASE_URL + '/save?title=' + bug.title + '&severity=' + bug.severity + '&desc=' + bug.desc)
        return res.data
    }
}