const User = require('../models/User');

//Create api for register
exports.register = async (req, res) => {
    const { firstName, lastName, email, password, shortName, profileColor } = req.body;
    
    try {
        // Step 1: Check if the email already exists
        const existingUser = await User.findOne({ email });

        // Step 2: If user with the same email exists, return a 409 conflict error
        if (existingUser) {
            return res.status(409).json({ message: 'Email already exists' });
        }

        // Step 3: If email is unique, create a new user
        const newUser = new User({ firstName, lastName, email, password, shortName, profileColor });

        // Step 4: Save the new user to the database
        await newUser.save();

        // Step 5: Send success response
        res.status(200).json({ message: 'User registered successfully' });
    } catch (err) {
        console.log(err);
        
        // Step 6: Handle any errors
        res.status(500).json({ message: 'Server error' });
    }
};

//Create api for login
exports.login =  async (req, res) => {
    const { email, password } = req.body;

    try {
        // Step 1: Find user by email
        const user = await User.findOne({ email });

        // Step 2: Check if user exists
        if (!user) {
            return res.status(409).json({ message: 'Invalid email or password' });
        }

        // Step 3: Compare entered password with stored hashed password
        const isMatch = await user.matchPassword(password);

        // Step 4: If passwords match, return success (or generate token, etc.)
        if (isMatch) {
            res.status(200).json({ message: 'Login successful' });
        } else {
            res.status(409).json({ message: 'Invalid email or password' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
}
