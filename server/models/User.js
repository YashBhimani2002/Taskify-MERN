const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,  
        trim: true,
        validate: {
            validator: (v) => {
                return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(v); // Basic email validation regex
            },
            message: 'Invalid email format',
        },
    },
    password: {
        type: String,
        required: true,
        minlength: 6,  // Minimum password length
    },
    emailVerificationStatus: {
        type: Boolean,
        default: false,  // Default to false if not verified
    },
    shortName: {
        type: String,
        required: true,
        trim: true,
    },
    profileColor: {
        type: String,
        default: '#000000',  // Default to black color
    },
});

// Pre-save middleware to hash the password before saving
userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10);  // Generate salt
        this.password = await bcrypt.hash(this.password, salt);  // Hash the password
    }
    next();
});

// Compare password (for login purposes)
userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Create and export the model
module.exports = mongoose.model('User', userSchema);
