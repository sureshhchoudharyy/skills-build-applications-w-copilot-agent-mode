import { Router } from 'express'
import Leaderboard from '../models/leaderboard.ts'

const router = Router()

router.get('/', async (req, res) => {
  const rankings = await Leaderboard.find().populate('user team').sort({ rank: 1 })
  res.json({ resource: 'leaderboard', rankings })
})

export default router
