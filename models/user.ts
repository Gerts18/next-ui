import mongoose from 'mongoose'

const schema = new mongoose.Schema(
    {
        name: String,
        lastName: String,
        email: String,
        password: String,
        phoneNumber: String,
        gradeRef: String
    }
)

export default mongoose.models.User || mongoose.model('User', schema);