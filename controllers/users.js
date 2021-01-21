import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

export const signin = async ( req, res ) => {
    //POST request from form comes in as req.body
    const { email, password } = req.body;

    try{
        //Find an existing user in the DB
        const existingUser = await User.findOne({ email });

        //If user does not exist throw an error
        if(!existingUser) return res.status(404).json({ message: "This user does not exist."})

        //Compare Password to Existing User password
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)

        //If password is not correct throw an error
        if(!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials."})

        //Get the Users JWT
        const token = jwt.sign({
            email: existingUser.email,
            id: existingUser._id
        }, 
        'test',
        { expiresIn: '1h'})

        res.status(200).json({ result: existingUser, token });
    }   
    catch (error){
        res.status(500).json({ message: 'Something went wrong.' });
    }
}   

export const signup = async ( req, res ) => {
    const { email, password, confirmPassword, firstName, lastName } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        //If user already exists, throw an error
        if(existingUser) return res.status(400).json({ message: "User already exists. "})

        //If passwords dont match
        if(password !== confirmPassword) return res.status(400).json({ message: "Passwords do not match." })

        //Hash password and salt it -- 12 is standard salt
        const hashedPassword = await bcrypt.hash(password, 12);

        //New User
        const result = await User.create({
            email,
            password: hashedPassword,
            name: `${firstName} ${lastName}`
        })

        //Get the Users JWT
        const token = jwt.sign({
            email: result.email,
            id: result._id,
        }, 
        'test',
        { expiresIn: '1h'})

        res.status(200).json({ result, token });
    }
    catch(error) {
        res.status(500).json({ message: 'Something went wrong.' });
    }
}
