import { userService } from '../services/user.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { UserList } from '../cmps/UserList.jsx'
import { useState, useEffect } from 'react'


export function UserIndex() {
  const [users, setUsers] = useState([])
  const [filterBy, setFilterBy] = useState(0)

  useEffect(() => {
    loadUsers()
  }, [users, filterBy])

  async function loadUsers() {
    const users = await userService.query(filterBy)
    setUsers(users)
  }



  async function onRemoveUser(userId) {
    try {
      await userService.remove(userId)
      console.log('Deleted Succesfully!')
      setUsers(prevUsers => prevUsers.filter((user) => user._id !== userId))
      showSuccessMsg('User removed')
    } catch (err) {
      console.log('Error from onRemoveUser ->', err)
      showErrorMsg('Cannot remove user')
    }
  }

  async function onAddUser() {
    const userToSave = {
      fullname: prompt('User full name?'),
      username: prompt('Username?'),
      password: prompt('Password?'),
      score: +prompt('Score?')
    }
    try {
      const savedUser = await userService.add(userToSave)
      console.log('Added User', savedUser)
      setUsers(prevUsers => [...prevUsers, savedUser])
      showSuccessMsg('User added')
    } catch (err) {
      console.log('Error from onAddUser ->', err)
      showErrorMsg('Cannot add user')
    }
  }

  async function onEditUser(user) {
    const fullname = prompt('New fullname? (keep blank if not needed)')
    const score = +prompt('New score?')
    const password = prompt('Desc (keep blank if not needed)')
    const userToSave = { ...user, fullname, score, password }
    try {
      console.log('Trying to update user')
      const savedUser = await userService.edit(userToSave)
      console.log('Updated User:', savedUser)
      setUsers(prevUsers => prevUsers.map((currUser) =>
        currUser._id === savedUser._id ? savedUser : currUser
      ))
      showSuccessMsg('User updated')
    } catch (err) {
      console.log('Error from onEditUser ->', err)
      showErrorMsg('Cannot update user')
    }
  }

  return (
    <main className="main-layout">
      <h3>Users App</h3>
      <main>
        <button onClick={onAddUser}>Add User ⛐</button>
        <UserList users={users} onRemoveUser={onRemoveUser} onEditUser={onEditUser} />
      </main>
    </main>
  )
}
