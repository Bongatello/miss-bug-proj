
import Axios from 'axios'

var axios = Axios.create({
    withCredentials: true,
})

const BASE_URL = '//localhost:3030/api/user'

export const userService = {
    query,
    getById,
    add,
    remove,
    edit,
}



async function query() {
    var { data: users } = await axios.get(BASE_URL)

    return users
}


async function getById(userId) {
    const res = await axios.get(`${BASE_URL}/${userId}`)
    return res.data
}


async function remove(userId) {
    const res = await axios.delete(`${BASE_URL}/${userId}`)
    return res.data
}


async function add(userToSave) {

    console.log('my new user is ', userToSave)
    const { data: addedUser } = await axios.post (BASE_URL, userToSave) 
    return addedUser

}

async function edit(userToEdit) {
    console.log('my existing user id is' + userToEdit._id)
    console.log(BASE_URL, userToEdit)
    //const res = await axios.get(`${BASE_URL}/save?_id=${bug._id}&title=${bug.title}&severity=${bug.severity}&desc=${bug.desc}`)
    const res = await axios.put(BASE_URL, userToEdit)
    return res.data
}