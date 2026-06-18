import { Router } from 'express'
import User from '../models/user.ts'

const router = Router()

router.get('/', async (req, res) => {
  const users = await User.find().populate('team')
  res.json({ resource: 'users', items: users })
})

router.post('/', async (req, res) => {
  const user = await User.create(req.body)
  res.status(201).json({ resource: 'users', item: user })
})

export default router
