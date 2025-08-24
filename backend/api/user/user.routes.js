import express from "express"
import { addUser, deleteUser, getAllUsers, getUserById, updateUser, checkIfLimited, addBugToCookies } from "./user.controller.js"


const router = express.Router()

router.get('/api/user', getAllUsers)

router.post('/api/user/', addUser)

router.put('/api/user/', updateUser)

router.get('/api/user/:userId', getUserById)

router.delete('/api/user/:userId', deleteUser)

router.get('/api/cookies/:bugId', addBugToCookies)

router.get('/api/cookies', checkIfLimited)



export const userRoutes = router


