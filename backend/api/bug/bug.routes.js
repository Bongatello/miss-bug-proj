import express from "express"
import { addBug, deleteBug, getAllBugs, getBugById, updateBug  } from "./bug.controller.js"


const router = express.Router()

router.get('/api/bug', getAllBugs)

router.post('/api/bug/', addBug)

router.put('/api/bug/', updateBug)

router.get('/api/bug/:bugId', getBugById)

router.delete('/api/bug/:bugId', deleteBug)



export const bugRoutes = router


