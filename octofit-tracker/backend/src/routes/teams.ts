import { Router } from 'express'
import Team from '../models/team.ts'

const router = Router()

router.get('/', async (req, res) => {
  const teams = await Team.find().populate('members')
  res.json({ resource: 'teams', items: teams })
})

router.post('/', async (req, res) => {
  const team = await Team.create(req.body)
  res.status(201).json({ resource: 'teams', item: team })
})

export default router
