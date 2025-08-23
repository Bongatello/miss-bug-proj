import express from "express"
import { addBug, deleteBug, getQueriedBugs, getBugById, updateBug, getBugLabels } from "./bug.controller.js"


const router = express.Router()

router.get('/api/bug/', getQueriedBugs)

router.post('/api/bug/', addBug)

router.put('/api/bug/', updateBug)

router.get('/api/bug/:bugId', getBugById)

router.delete('/api/bug/:bugId', deleteBug)

router.get('/api/bugLabels', getBugLabels)



export const bugRoutes = router


