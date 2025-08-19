import express from "express"
import { addUser, deleteUser, getAllUsers, getUserById, updateUser  } from "./user.controller.js"


const router = express.Router()

router.get('/api/user', getAllUsers)

router.post('/api/user/', addUser)

router.put('/api/user/', updateUser)

router.get('/api/user/:id', getUserById)

router.delete('/api/user/:userId', deleteUser)



export const userRoutes = router


