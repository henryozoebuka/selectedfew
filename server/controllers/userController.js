import mongoose from "mongoose";
import UserModel from "../models/userModel.js";
import TransactionModel from "../models/transactionModel.js";
import UserOTPVerificationModel from '../models/userOTPVerificationModel.js';
import bcrypt from 'bcryptjs';
import generator from 'generate-password';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS
    }
});


//sign up
const signUp = async (req, res) => {
    const { username, password, firstname, lastname, email, phoneNumber, gender, dateOfBirth } = req.body;
    try {
        if (!username || !password || !firstname || !lastname || !email || !gender || !dateOfBirth) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Invalid email format.' });
        }

        if (password.length < 8) {
            return res.status(400).json({ message: 'Password must be at least 8 characters long.' });
        }

        const existingUser = await UserModel.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            if (existingUser.verified === true) {
                return res.status(409).json({ message: existingUser.email === email ? 'Email already exists. Please login.' : 'Username already exists. Please login.' });
            }

            if (existingUser.OTPNumberOfAttempts > 4) {
                return res.status(403).json({ message: 'You have exhausted your OTP attempts. Contact the admin.' })
            } else {
                await UserOTPVerificationModel.deleteMany({ userId: existingUser._id });
                //otp verification section
                const generateOTP = crypto.randomInt(100000, 1000000);
                const formattedOTP = generateOTP.toString().padStart(6, '0');
                const OTPSalt = await bcrypt.genSalt(10);
                const hashedOTP = await bcrypt.hash(formattedOTP, OTPSalt);
                const verificationOTP = await UserOTPVerificationModel.create({
                    userId: existingUser._id,
                    OTP: hashedOTP
                });

                if (!verificationOTP) {
                    return res.status(500).json({ message: 'Error creating OTP verification document.' });
                }

                const mailOptions = {
                    to: existingUser.email,
                    from: 'info@selectedfewclub.com',
                    subject: 'Verification OTP from Selected Few Club',
                    html: `<p>This is your OTP: <strong>${generateOTP}</strong>.</p>
                    <p>Use before it expires.</p>`
                }

                transporter.sendMail(mailOptions, (err, info) => {
                    if (err) {
                        return res.status(500).json({ message: err.message })
                    }
                    console.log('Email sent: ', info && info.accepted ? info.accepted : (info && info.rejected ? info.rejected : 'No status available'));

                    return res.status(202).json({ userId: existingUser._id });
                });
            }
        }

        // Validate dateOfBirth (optional: ensure it's a valid date and that the user is above a certain age, like 18)
        const dob = new Date(dateOfBirth);
        if (isNaN(dob.getTime())) {
            return res.status(400).json({ message: 'Invalid date of birth.' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await UserModel.create({ username, password: hashedPassword, firstname, lastname, email, phoneNumber, gender, dateOfBirth });

        if (!user) {
            return res.status(500).json({ message: 'Error creating user.' });
        }

        //otp verification section
        const generateOTP = crypto.randomInt(100000, 1000000);
        const formattedOTP = generateOTP.toString().padStart(6, '0');
        const OTPSalt = await bcrypt.genSalt(10);
        const hashedOTP = await bcrypt.hash(formattedOTP, OTPSalt);
        const verificationOTP = await UserOTPVerificationModel.create({
            userId: user._id,
            OTP: hashedOTP
        });

        if (!verificationOTP) {
            return res.status(500).json({ message: 'Error creating OTP verification document.' });
        }

        const mailOptions = {
            to: email,
            from: 'info@selectedfewclub.com',
            subject: 'Verification OTP from Selected Few Club',
            html: `<p>This is your OTP: <strong>${generateOTP}</strong>.</p>
                    <p>Use before it expires.</p>`
        }

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                return res.status(500).json({ message: err.message })
            }
            console.log('Email sent: ', info && info.accepted ? info.accepted : (info && info.rejected ? info.rejected : 'No status available'));
            return res.status(200).json({ userId: user._id });
        });


    } catch (error) {
        console.error('Error occurred at the backend.', error);
        res.status(500).json({ message: 'Error occurred at the backend. Please try again later.' })
    }
}

//create user
const createUser = async (req, res) => {
    try {
        const { firstname, lastname, email, gender, phoneNumber } = req.body;
        if (!firstname || !lastname || !email || !phoneNumber || !gender) {
            return res.status(400).json({ message: "All fields are required." });
        }
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Invalid email format.' });
        }

        const existingUser = await UserModel.findOne({ $or: [{ email }, { phoneNumber }] });
        if (existingUser) {
            return res.status(409).json({ message: existingUser.email === email ? 'Email already exists. Please verify.' : 'Phone number already exists. Please verify.' });
        }

        const password = generator.generate({ length: 10, numbers: true });
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);


        const lastUser = await UserModel.findOne().sort({ accountNumber: -1 });
        const newAccountNumber = lastUser ? Number(lastUser.accountNumber) + 1 : 1000;

        const user = await UserModel.create({ password: hashedPassword, accountNumber: newAccountNumber.toString(), firstname, lastname, email, gender, phoneNumber });

        if (!user) {
            return res.status(500).json({ message: 'Error creating user.' });
        }

        const mailOptions = {
            to: email,
            from: 'info@selectedfewclub.com',
            subject: 'Verification email from Selected Few Club',
            html: `<p>Please log in with this temporary password: <strong>${password}</strong></p>
                    <p>You are required to change it on your first login.</p>`
        }

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                return res.status(500).json({ message: err.message })
            }
            console.log('Email sent: ', info?.accepted || 'No status available');
            return res.status(200).json({ message: 'User created successfully.' });
        });

    } catch (error) {
        res.status(500).json({ message: 'Something went wrong while creating user. Try again later.' })
        console.error(error);
    }
}

//register otp
const confirmOTP = async (req, res) => {
    try {
        const { userId, otp } = req.body;

        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "We can't find your record. Please sign up if you have not." });
        }

        if (user.OTPNumberOfAttempts > 5) {
            return res.status(403).json({ message: 'You have exhausted your maximum number of attempts. Try again after 24 hours.' });
        }

        const userOTPRecord = await UserOTPVerificationModel.findOne({ userId });

        if (!userOTPRecord) {
            return res.status(404).json({ message: 'No OTP record found. Please request a new OTP.' });
        }

        // Check if OTP has expired (compare expiryDate with current time)
        const currentDate = new Date();

        if (userOTPRecord.expiryDate < currentDate) {
            await UserOTPVerificationModel.deleteMany({ userId });
            const generateOTP = crypto.randomInt(100000, 1000000);
            const formattedOTP = generateOTP.toString().padStart(6, '0');
            console.log(formattedOTP);
            const OTPSalt = await bcrypt.genSalt(10);
            const hashedOTP = await bcrypt.hash(formattedOTP, OTPSalt);
            const verificationOTP = await UserOTPVerificationModel.create({
                userId: user._id,
                OTP: hashedOTP
            });

            if (!verificationOTP) {
                return res.status(500).json({ message: 'Error creating OTP verification document.' });
            }

            const mailOptions = {
                to: user.email,
                from: 'info@selectedfewclub.com',
                subject: 'Verification OTP from Selected Few Club',
                html: `<p>This is your OTP: <strong>${generateOTP}</strong>.</p>
                    <p>Use before it expires.</p>`
            }

            transporter.sendMail(mailOptions, (err, info) => {
                if (err) {
                    return res.status(500).json({ message: err.message })
                }
                console.log('Email sent: ', info && info.accepted ? info.accepted : (info && info.rejected ? info.rejected : 'No status available'));
            })
            return res.status(400).json({ message: 'This OTP has expired. Please check your email for a new one.' });
        }

        const verifyOTP = await bcrypt.compare(otp, userOTPRecord.OTP);
        if (!verifyOTP) {
            user.OTPNumberOfAttempts += 1;
            await user.save();
            await UserOTPVerificationModel.deleteMany({ userId });

            //generate new otp for the user
            const generateOTP = crypto.randomInt(100000, 1000000);
            const formattedOTP = generateOTP.toString().padStart(6, '0');
            const OTPSalt = await bcrypt.genSalt(10);
            const hashedOTP = await bcrypt.hash(formattedOTP, OTPSalt);
            const verificationOTP = await UserOTPVerificationModel.create({
                userId: user._id,
                OTP: hashedOTP
            });

            if (!verificationOTP) {
                return res.status(500).json({ message: 'Error creating OTP verification document.' });
            }

            const mailOptions = {
                to: user.email,
                from: 'info@selectedfewclub.com',
                subject: 'Verification OTP from Selected Few Club',
                html: `<p>This is your OTP: <strong>${generateOTP}</strong>.</p>
                    <p>Use before it expires.</p>`
            }

            transporter.sendMail(mailOptions, (err, info) => {
                if (err) {
                    return res.status(500).json({ message: err.message })
                }
                console.log('Email sent: ', info && info.accepted ? info.accepted : (info && info.rejected ? info.rejected : 'No status available'));
                return res.status(200).json({ userId: user._id });
            })



            return res.status(400).json({ message: `Invalid OTP, please check your email for a new one. You have ${5 - user.OTPNumberOfAttempts} attempts remaining.` });
        }

        user.verified = true;
        user.OTPNumberOfAttempts = 0;
        await user.save();
        await UserOTPVerificationModel.deleteMany({ userId });

        res.status(200).json({ message: 'Congratulations! You have succefully confirmed your OTP. You can login to your account.', userId: user._id });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Something went while verify OTP. ', error });
    }
}

//login
const login = async (req, res) => {
    const { email, password } = req.body;
    console.log(password)
    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required!" });
    }

    try {
        const user = await UserModel.findOne({ $or: [{ email: email }, { phoneNumber: email }] }).select("firstname lastname email phoneNumber gender photo role accountNumber accountBalance status OTPNumberOfAttempts createdAt updatedAt");
        if (!user) {
            return res.status(404).json({ message: 'User does not exist' });
        }

        const verifyUser = await bcrypt.compare(password, user.password);
        if (!verifyUser) {
            return res.status(400).json({ message: 'Invalid login details.' });
        }

        if (user.status === 'inactive') {
            return res.status(403).json({ message: 'Your account is inactive. Please contact the admin.' });
        }

        if (user.verified === false) {
            return res.status(202).json({ message: 'Please change your password', userId: user._id });
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_PASSWORD, { expiresIn: '1h' });

        return res.status(200).json({ message: 'Login successful', user, token }); // Added return for consistency
    } catch (error) {
        console.error('Error occurred at the backend.', error);
        return res.status(500).json({ message: 'Error occurred at the backend.' });
    }
};

//change password
const changePassword = async (req, res) => {
    const { id, password } = req.body;
    if (!id || !password) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        const user = await UserModel.findById(id);
        if (!user) {
            return res.status(404).json({ message: "We can't find your record." });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        user.password = hashedPassword;
        user.verified = true;
        await user.save();

        return res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong while changing your password.' });
        console.error(error);
    }
}

//logout
const logout = (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict',
        path: '/',
    });

    // Respond with a success message or redirect
    res.status(200).json({ message: 'Logged out successfully', user: {} });
};


//forgot password
const forgotPassword = async (req, res) => {
    const { email, phoneNumber } = req.body;
    if (!email || !phoneNumber) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User does not exist' });
        }

        if (user.phoneNumber !== phoneNumber) {
            return res.status(400).json({ message: 'No matching record. Please contact the admin.' });
        }

        if (user.OTPNumberOfAttempts > 4) {
            return res.status(403).json({ message: 'You have exhausted your OTP attempts. Contact the admin.' })
        }

        if (user.verified === false) {
            await UserOTPVerificationModel.deleteMany({ userId: user._id })
            const generateOTP = crypto.randomInt(100000, 1000000);
            const formattedOTP = generateOTP.toString().padStart(6, '0');
            const OTPSalt = await bcrypt.genSalt(10);
            const hashedOTP = await bcrypt.hash(formattedOTP, OTPSalt);
            const verificationOTP = await UserOTPVerificationModel.create({
                userId: user._id,
                OTP: hashedOTP
            });

            if (!verificationOTP) {
                return res.status(500).json({ message: 'Error creating OTP verification document.' });
            }

            const mailOptions = {
                to: user.email,
                from: 'info@selectedfewclub.com',
                subject: 'Verification OTP from Selected Few Club',
                html: `<p>This is your OTP: <strong>${generateOTP}</strong>.</p>
                    <p>Use before it expires.</p>`
            }

            transporter.sendMail(mailOptions, (err, info) => {
                if (err) {
                    return res.status(500).json({ message: err.message })
                }
                console.log('Email sent: ', info && info.accepted ? info.accepted : (info && info.rejected ? info.rejected : 'No status available'));
                return res.status(202).json({ userId: user._id });
            })
        }

        await UserOTPVerificationModel.deleteMany({ userId: user._id })
        const generateOTP = crypto.randomInt(100000, 1000000);
        const formattedOTP = generateOTP.toString().padStart(6, '0');
        const OTPSalt = await bcrypt.genSalt(10);
        const hashedOTP = await bcrypt.hash(formattedOTP, OTPSalt);
        const verificationOTP = await UserOTPVerificationModel.create({
            userId: user._id,
            OTP: hashedOTP
        });

        if (!verificationOTP) {
            return res.status(500).json({ message: 'Error creating OTP verification document.' });
        }

        const mailOptions = {
            to: user.email,
            from: 'info@selectedfewclub.com',
            subject: 'Verification OTP from Selected Few Club',
            html: `<p>This is your OTP: <strong>${generateOTP}</strong>.</p>
                    <p>Use before it expires.</p>`
        }

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                return res.status(500).json({ message: err.message })
            }
            console.log('Email sent: ', info && info.accepted ? info.accepted : (info && info.rejected ? info.rejected : 'No status available'));
            return res.status(200).json({ userId: user._id });
        })

    } catch (error) {
        console.error('Error occurred at the backend.', error);
        res.status(500).json({ message: 'Error occurred at the backend.' })
    }
}

const resetPassword = async (req, res) => {
    const userId = req.params.id;
    try {
        const { otp, newPassword } = req.body;

        if (newPassword.length < 8) {
            return res.status(400).json({ message: 'Password must be at least 8 characters long.' });
        }

        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "We can't find your record. Please sign up if you have not." });
        }

        if (user.verified === false) {
            return res.status(400).json({ message: 'You have not verified your account. Check your email for your verification OTP.' });
        }

        if (user.OTPNumberOfAttempts > 15) {
            return res.status(403).json({ message: 'You have exhausted your maximum number of attempts. Try again after 24 hours.' });
        }

        const userOTPRecord = await UserOTPVerificationModel.findOne({ userId });

        if (!userOTPRecord) {
            return res.status(404).json({ message: 'No OTP record found. Please request a new OTP.' });
        }


        // Check if OTP has expired (compare expiryDate with current time)
        const currentDate = new Date();

        if (userOTPRecord.expiryDate < currentDate) {
            await UserOTPVerificationModel.deleteMany({ userId });
            const generateOTP = crypto.randomInt(100000, 1000000);
            const formattedOTP = generateOTP.toString().padStart(6, '0');
            const OTPSalt = await bcrypt.genSalt(10);
            const hashedOTP = await bcrypt.hash(formattedOTP, OTPSalt);
            const verificationOTP = await UserOTPVerificationModel.create({
                userId: user._id,
                OTP: hashedOTP
            });

            if (!verificationOTP) {
                return res.status(500).json({ message: 'Error creating OTP verification document.' });
            }

            const mailOptions = {
                to: user.email,
                from: 'info@selectedfewclub.com',
                subject: 'Verification OTP from Selected Few Club',
                html: `<p>This is your OTP: <strong>${generateOTP}</strong>.</p>
                    <p>Use before it expires.</p>`
            }

            transporter.sendMail(mailOptions, (err, info) => {
                if (err) {
                    return res.status(500).json({ message: err.message })
                }
                console.log('Email sent: ', info && info.accepted ? info.accepted : (info && info.rejected ? info.rejected : 'No status available'));
            })
            return res.status(400).json({ message: 'This OTP has expired. Please check your email for a new one.' });
        }

        const verifyOTP = await bcrypt.compare(otp, userOTPRecord.OTP)
        if (!verifyOTP) {
            user.OTPNumberOfAttempts += 1;
            await user.save();

            await UserOTPVerificationModel.deleteMany({ userId });

            //generate new otp for the user
            const generateOTP = crypto.randomInt(100000, 1000000);
            const formattedOTP = generateOTP.toString().padStart(6, '0');
            const OTPSalt = await bcrypt.genSalt(10);
            const hashedOTP = await bcrypt.hash(formattedOTP, OTPSalt);
            const verificationOTP = await UserOTPVerificationModel.create({
                userId: user._id,
                OTP: hashedOTP
            });

            if (!verificationOTP) {
                return res.status(500).json({ message: 'Error creating OTP verification document.' });
            }

            const mailOptions = {
                to: user.email,
                from: 'info@selectedfewclub.com',
                subject: 'Verification OTP from Selected Few Club',
                html: `<p>This is your OTP: <strong>${generateOTP}</strong>.</p>
                    <p>Use before it expires.</p>`
            }

            transporter.sendMail(mailOptions, (err, info) => {
                if (err) {
                    return res.status(500).json({ message: err.message })
                }
                console.log('Email sent: ', info && info.accepted ? info.accepted : (info && info.rejected ? info.rejected : 'No status available'));
            })

            return res.status(400).json({ message: `Invalid OTP, please check your email for a new one. You have ${5 - user.OTPNumberOfAttempts} attempts remaining.`, userId: user._id });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        user.password = hashedPassword;
        user.OTPNumberOfAttempts = 0;
        await user.save();
        await UserOTPVerificationModel.deleteMany({ userId });

        res.status(200).json({ message: 'Congratulations! You have succefully confirmed your OTP. You can login to your account.' });

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: 'Something went while verify OTP. ', error })
    }
}

//fetchusers
const fetchUsers = async (req, res) => {
    try {

        const users = await UserModel.find().select("firstname lastname email phoneNumber gender photo role accountNumber accountBalance status OTPNumberOfAttempts createdAt updatedAt");

        // Check if the array is empty
        if (users.length === 0) {
            return res.status(404).json({ message: 'No users found.' });
        }

        res.status(200).json(users);

    } catch (error) {
        console.log('Error occurred at the backend while fetching users. ', error);
        res.status(500).json({ message: 'Error fetching users.' });
    }
}

//fetchuser
const fetchUserAccountBalance = async (req, res) => {
    const { id } = req.query;
    try {
        const user = await UserModel.findById(id);

        // Check if the array is empty
        if (!user) {
            return res.status(404).json({ message: 'User record not found.' });
        }

        res.status(200).json(user.accountBalance);

    } catch (error) {
        console.log('Error occurred at the backend while fetching user account balance. ', error);
        res.status(500).json({ message: 'Error fetching user account balance.' });
    }
}

//reset login number of attempts
const resetLoginAttempts = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await UserModel.findByIdAndUpdate(id, { OTPNumberOfAttempts: 0 }, { new: true })
        if (!user) {
            return res.status(404).json({ message: 'User does not exist.' })
        }
        res.status(200).json({ message: 'Number of attempts reset successful!' });
    } catch (error) {
        res.status(500).json({ message: 'Something went wrong while reseting number of login attempts.' })
        console.error(error);
    }
}

//edit user details
const editUser = async (req, res) => {
    const id = req.params.id;
    try {
        const editedUser = await UserModel.findByIdAndUpdate(id, req.body, { new: true });
        if (!editedUser) {
            return res.status(404).json({ message: 'User not found.' });
        }
        res.status(200).json({ message: 'User updated successfully.', editedUser });
    } catch (error) {
        console.error('Error occurred at the backend.', error);
        res.status(500).json({ message: 'Error occurred at the backend.' })
    }
}

//delete user account
const deleteUser = async (req, res) => {
    const id = req.params.id;
    try {
        const deletedUser = await UserModel.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found.' });
        }
        res.status(200).json({ message: 'User deleted successfully.' });
    } catch (error) {
        console.error('Error occurred at the backend.', error);
        res.status(500).json({ message: 'Error occurred at the backend.' })
    }
}

//delete users
const deleteUsers = async (req, res) => {
    const { users } = req.body;
    const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);


    try {
        if (!Array.isArray(users) || users.length === 0) {
            return res.status(400).json({ message: 'Please provide an array of user IDs to delete.' });
        }

        if (!users.every(isValidObjectId)) {
            return res.status(400).json({ message: 'One or more user IDs are invalid.' });
        }

        const deletedUsers = await UserModel.deleteMany({ _id: { $in: users } });

        if (deletedUsers.deletedCount === 0) {
            return res.status(404).json({ message: 'No users found to delete.' });
        }

        res.status(200).json({ message: `${deletedUsers.deletedCount} users deleted successfully.` });
    } catch (error) {
        console.error('Error occurred at the backend.', error);
        res.status(500).json({ message: 'Error occurred at the backend.' });
    }
};

//admin edit user
const adminEditUser = async (req, res) => {
    console.log(req.file ? req.file : null)
    try {
        const user = await UserModel.findByIdAndUpdate(req.params.id, { ...req.body, photo: req.file ? req.file.location : req.body.photo });
        if (!user) {
            return res.status(404).json({ message: 'User does not exist' });
        }
        res.status(200).json({ message: 'User record updated successfully!' });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Something went wrong during editing. Try again later.' });
    }
}

//admin edit photo
// const editPhoto = async (req, res) => {
//     try {
//         console.log('Request Body:', req.body); // Check if other fields are being sent
//         console.log('Request File:', req.file); // Check if the file is being received
//         console.log('Request Files:', req.files); // If using multiple files

//         if (!req.file) {
//             return res.status(400).json({ message: 'No file uploaded' });
//         }
//         const user = await UserModel.findByIdAndUpdate(req.params.id, { photo: req.file ? req.file.location : undefined }, { new: true });
//         if (!user) {
//             return res.status(404).json({ message: 'User does not exist' });
//         }
//         res.status(200).json({ message: 'Your profile photo updated successfully!', user });
//     } catch (error) {
//         console.error('Error updating user:', error);
//         res.status(500).json({ message: 'Something went wrong during editing. Try again later.' });
//     }
// }

const editPhoto = async (req, res) => {
    try {
        console.log('Request Body:', req.body); // Check if other fields are being sent
        console.log('Request File:', req.file); // Check if the file is being received
        console.log('Request Files:', req.files); // If using multiple files

        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const user = await UserModel.findByIdAndUpdate(
            req.params.id,
            { photo: req.file.location }, // Update the user's photo with the S3 URL
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: 'User does not exist' });
        }

        res.status(200).json({ message: 'Your profile photo updated successfully!', user });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Something went wrong during editing. Try again later.' });
    }
};

//fetch account
const fetchAccount = async (req, res) => {
    const { accountNumber } = req.body;
    try {
        const user = await UserModel.findOne({ accountNumber });

        // Check if the array is empty
        if (!user) {
            return res.status(404).json({ message: 'Invalid account number.' });
        }
        res.status(200).json({ data: { firstname: user.firstname, lastname: user.lastname } });

    } catch (error) {
        console.log('Error occurred at the backend while fetching user. ', error);
        res.status(500).json({ message: 'Error fetching user.' });
    }
}

//transfer fund
const transferFund = async (req, res) => {
    const { sender, accountNumber, amount, description } = req.body;
    if (!sender || !accountNumber || !amount) {
        return res.status(400).json({ message: 'All field are required.' });
    }

    const session = await mongoose.startSession(); // Start session here

    try {
        session.startTransaction();

        const receiver = await UserModel.findOne({ accountNumber }).session(session).exec();
        if (!receiver) {
            await session.abortTransaction();
            session.endSession();
            return res.status(404).json({ message: `User with account number: ${accountNumber} does not exist.` });
        }

        const senderUser = await UserModel.findById(sender).session(session).exec();
        if (!senderUser) {
            await session.abortTransaction();
            session.endSession();
            return res.status(404).json({ message: `Sender does not exist.` });
        }

        if (amount > senderUser.accountBalance) {
            await session.abortTransaction();
            session.endSession();
            return res.status(403).json({ message: `Insufficient balance. Please fund your account.` });
        }

        // Deduct from sender
        senderUser.accountBalance -= Number(amount);
        // Add to receiver
        receiver.accountBalance += Number(amount);

        await senderUser.save({ session });
        await receiver.save({ session });

        // Create transaction record with session
        const transaction = new TransactionModel({ sender, receiver: receiver._id, description, amount });
        console.log(transaction)
        await transaction.save({ session });

        // Commit transaction
        await session.commitTransaction();

        const formattedAmount = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'NGN' }).format(amount);

        const mailOptions = {
            to: receiver.email,
            from: `${senderUser.firstname}@selectedfewclub.com`,
            subject: `Fund transfer from ${senderUser.firstname}`,
            html: `<p>${senderUser.firstname + " " + senderUser.lastname} transferred <strong>${formattedAmount}</strong> to your account.</p>
            <p>${description}</P>
            <p>Enjoy!</p>`
        }

        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                return res.status(500).json({ message: err.message });
            }
            console.log('Email sent: ', info?.accepted || 'No status available');
            res.status(200).json({ message: `Successfully transferred ${formattedAmount} to ${receiver.firstname}.` });
        });

    } catch (error) {
        console.error(error);
        if (session.inTransaction()) {
            await session.abortTransaction(); // Abort only if a transaction started
        }
        res.status(500).json({ message: 'Something went wrong during your transfer.' });
    } finally {
        session.endSession(); // Ensure session is closed no matter what
    }
};


//admin transfer fund
const adminTransferFund = async (req, res) => {
    const { sender, accountNumber, amount, description } = req.body;
    if (!sender || !accountNumber || !amount) {
        return res.status(400).json({ message: 'All field are required.' });
    }

    const session = await mongoose.startSession(); // Start session here

    try {
        session.startTransaction();

        const receiver = await UserModel.findOne({ accountNumber }).session(session).exec();
        if (!receiver) {
            await session.abortTransaction();
            session.endSession();
            return res.status(404).json({ message: `User with account number: ${accountNumber} does not exist.` });
        }

        const senderUser = await UserModel.findById(sender).session(session).exec();
        if (!senderUser) {
            await session.abortTransaction();
            session.endSession();
            return res.status(404).json({ message: `Sender does not exist.` });
        }

        receiver.accountBalance += Number(amount);

        // await senderUser.save({ session });
        await receiver.save({ session });

        // Create transaction record with session
        const transaction = new TransactionModel({ sender, receiver: receiver._id, description, amount });
        await transaction.save({ session });

        // Commit transaction
        await session.commitTransaction();
        res.status(200).json({ message: `Successfully transferred ${amount} to ${receiver.firstname}.` });
        console.log(receiver.accountBalance)
    } catch (error) {
        console.error(error);
        if (session.inTransaction()) {
            await session.abortTransaction(); // Abort only if a transaction started
        }
        res.status(500).json({ message: 'Something went wrong during your transfer.' });
    } finally {
        session.endSession(); // Ensure session is closed no matter what
    }
};

export { createUser, changePassword, signUp, confirmOTP, login, logout, forgotPassword, resetPassword, resetLoginAttempts, fetchUserAccountBalance, fetchUsers, editUser, adminEditUser, editPhoto, deleteUser, deleteUsers, fetchAccount, transferFund, adminTransferFund }