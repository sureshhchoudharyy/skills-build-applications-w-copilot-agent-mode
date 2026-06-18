import mongoose from 'mongoose'

const workoutSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], default: 'beginner' },
    durationMinutes: { type: Number, required: true },
    targetMuscles: [{ type: String }],
    createdAt: { type: Date, default: () => new Date() }
  },
  { timestamps: true }
)

const Workout = mongoose.model('Workout', workoutSchema)
export default Workout
