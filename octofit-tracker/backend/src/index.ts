import express from 'express'
import { connectDatabase } from './database.ts'
import usersRouter from './routes/users.ts'
import teamsRouter from './routes/teams.ts'
import activitiesRouter from './routes/activities.ts'
import leaderboardRouter from './routes/leaderboard.ts'
import workoutsRouter from './routes/workouts.ts'

const app = express()
const port = 8000
const codespaceName = process.env.CODESPACE_NAME
const host = codespaceName ? `https://${codespaceName}-8000.githubpreview.dev` : `http://localhost:${port}`

app.use(express.json())
app.use('/api/users', usersRouter)
app.use('/api/teams', teamsRouter)
app.use('/api/activities', activitiesRouter)
app.use('/api/leaderboard', leaderboardRouter)
app.use('/api/workouts', workoutsRouter)

app.get('/', (req, res) => {
  res.json({ status: 'ok', apiUrl: host, message: 'OctoFit Tracker API is running' })
})

connectDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`Backend listening on ${host}`)
    })
  })
  .catch((error) => {
    console.error('MongoDB connection failed:', error)
  })
