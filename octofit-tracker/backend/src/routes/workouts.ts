import { Router } from 'express'
import Workout from '../models/workout.ts'

const router = Router()

router.get('/', async (req, res) => {
  const workouts = await Workout.find()
  res.json({ resource: 'workouts', items: workouts })
})

router.post('/', async (req, res) => {
  const workout = await Workout.create(req.body)
  res.status(201).json({ resource: 'workouts', item: workout })
})

export default router
