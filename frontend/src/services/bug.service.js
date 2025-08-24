
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
    getBugLabels,
}



async function query(filterBy, sortByValue) {
    console.log('query: ',filterBy.labels)
    var { data: bugs } = await axios.get(BASE_URL, { params: {
        txt: filterBy.txt,
        severity: filterBy.severity,
        labels: filterBy.labels.join(','),
        sortBy: sortByValue
    } })
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


async function getBugLabels() {
    const res = await axios.get(`//localhost:3030/api/bugLabels`)
    return res.data
}