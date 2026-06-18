import { Router } from 'express'
import Activity from '../models/activity.ts'

const router = Router()

router.get('/', async (req, res) => {
  const activities = await Activity.find().populate('user')
  res.json({ resource: 'activities', items: activities })
})

router.post('/', async (req, res) => {
  const activity = await Activity.create(req.body)
  res.status(201).json({ resource: 'activities', item: activity })
})

export default router
