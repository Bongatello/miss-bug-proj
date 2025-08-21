
import Axios from 'axios'

var axios = Axios.create({
    withCredentials: true,
})

const BASE_URL = '//localhost:3030/api/bug'

export const bugService = {
    query,
    getById,
    add,
    remove,
    edit,
    getDefaultFilter,
}



async function query(filterBy = {}) {
    var { data: bugs } = await axios.get(BASE_URL, { params: filterBy })

    if (filterBy.severity) bugs = bugs.filter(bug => bug.severity>filterBy.severity)
    
    if (filterBy.txt) {
        const regExp = new RegExp(filterBy.txt, 'i')
        bugs = bugs.filter(bug => regExp.test(bug.title))
    }
    return bugs
}


async function getById(bugId) {
    const res = await axios.get(`${BASE_URL}/${bugId}`)
    return res.data
}


async function remove(bugId) {
    console.log('front bug service: removing bug - ', bugId)
    const res = await axios.delete(`${BASE_URL}/${bugId}`)
    return res.data
}


async function add(bugToSave) {

    console.log('my new bug is ', bugToSave)
    const { data: addedBug } = await axios.post (BASE_URL, bugToSave) 
    return addedBug

}

async function edit(bugToEdit) {
    console.log('my existing bug id is' + bugToEdit._id)

    //const res = await axios.get(`${BASE_URL}/save?_id=${bug._id}&title=${bug.title}&severity=${bug.severity}&desc=${bug.desc}`)
    const res = await axios.put(BASE_URL, bugToEdit)
    return res.data
}



function getDefaultFilter() {
    return { txt: '', severity: 0, labels: [],pageIdx: undefined }
}
