import mongoose from 'mongoose'

const defaultMongoUri = 'mongodb://localhost:27017/octofit_db'
const mongoUri = process.env.MONGODB_URI ?? defaultMongoUri

export async function connectDatabase() {
  console.log(`Connecting to MongoDB at ${mongoUri}`)
  await mongoose.connect(mongoUri)
  console.log('Connected to MongoDB')
}

export default mongoose
