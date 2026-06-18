import mongoose from 'mongoose'

const leaderboardSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
    rank: { type: Number, required: true },
    points: { type: Number, required: true },
    updatedAt: { type: Date, default: () => new Date() }
  },
  { timestamps: true }
)

const Leaderboard = mongoose.model('Leaderboard', leaderboardSchema)
export default Leaderboard
