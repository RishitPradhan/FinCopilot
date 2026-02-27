const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, sparse: true }, // optional for wallet users
    password: { type: String }, // optional for wallet users
    walletAddress: { type: String, unique: true, sparse: true, lowercase: true },
    riskAppetite: {
        type: String,
        enum: ['beginner', 'moderate', 'aggressive'],
        default: 'moderate'
    },
    iqScore: { type: Number, default: 50 },
    createdAt: { type: Date, default: Date.now }
});

// Hash password before saving (only if password is set/modified)
userSchema.pre('save', async function () {
    if (!this.isModified('password') || !this.password) return;
    this.password = await bcrypt.hash(this.password, 10);
});

// Compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
    if (!this.password) return false;
    return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);

