import mongoose from 'mongoose'
import User from '../models/user.ts'
import Team from '../models/team.ts'
import Activity from '../models/activity.ts'
import Leaderboard from '../models/leaderboard.ts'
import Workout from '../models/workout.ts'

const mongoUri = process.env.MONGODB_URI ?? 'mongodb://localhost:27017/octofit_db'

async function seed() {
  console.log('Seed the octofit_db database with test data')

  await mongoose.connect(mongoUri)
  console.log(`Connected to MongoDB at ${mongoUri}`)

  await User.deleteMany({})
  await Team.deleteMany({})
  await Activity.deleteMany({})
  await Leaderboard.deleteMany({})
  await Workout.deleteMany({})

  const users = await User.create([
    { name: 'Ava Walker', email: 'ava.walker@example.com', role: 'member' },
    { name: 'Noah Patel', email: 'noah.patel@example.com', role: 'member' },
    { name: 'Mia Chen', email: 'mia.chen@example.com', role: 'coach' }
  ])

  const teams = await Team.create([
    { name: 'Metro Fitness', description: 'Community-based running and strength team', members: [users[0]._id, users[1]._id] },
    { name: 'Peak Performance', description: 'Advanced athletes training for competitions', members: [users[2]._id] }
  ])

  const activities = await Activity.create([
    {
      user: users[0]._id,
      type: 'Running',
      durationMinutes: 45,
      caloriesBurned: 420,
      notes: 'Morning tempo run around the park'
    },
    {
      user: users[1]._id,
      type: 'Strength Training',
      durationMinutes: 60,
      caloriesBurned: 520,
      notes: 'Full-body circuit with dumbbells'
    },
    {
      user: users[2]._id,
      type: 'Yoga',
      durationMinutes: 30,
      caloriesBurned: 180,
      notes: 'Recovery flow and mobility session'
    }
  ])

  const workouts = await Workout.create([
    {
      title: 'Beginner Full Body Blast',
      description: 'A balanced routine for newcomers focused on mobility and strength.',
      difficulty: 'beginner',
      durationMinutes: 30,
      targetMuscles: ['legs', 'core', 'upper body']
    },
    {
      title: 'Cardio Power Interval',
      description: 'High-intensity intervals to boost endurance and fat burn.',
      difficulty: 'intermediate',
      durationMinutes: 40,
      targetMuscles: ['cardio']
    },
    {
      title: 'Advanced Strength Challenge',
      description: 'A demanding workout for experienced athletes.',
      difficulty: 'advanced',
      durationMinutes: 55,
      targetMuscles: ['full body']
    }
  ])

  const leaderboard = await Leaderboard.create([
    { user: users[1]._id, team: teams[0]._id, rank: 1, points: 1320 },
    { user: users[0]._id, team: teams[0]._id, rank: 2, points: 1180 },
    { user: users[2]._id, team: teams[1]._id, rank: 3, points: 980 }
  ])

  console.log('Seed data created:')
  console.log({ users: users.length, teams: teams.length, activities: activities.length, workouts: workouts.length, leaderboard: leaderboard.length })

  await mongoose.disconnect()
  console.log('Disconnected from MongoDB')
}

seed().catch((error) => {
  console.error('Seed script failed:', error)
  process.exit(1)
})
