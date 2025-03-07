import express from 'express';
import upload from '../middlewares/uploadMiddleware.js';
// import multer from 'multer'
import authenticateToken from '../middlewares/authenticateToken.js';
import { createUser, signUp, confirmOTP, deleteUser, deleteUsers, login, logout, changePassword, editUser, fetchUsers, forgotPassword, resetPassword, adminEditUser, editPhoto, resetLoginAttempts, transferFund, adminTransferFund, fetchAccount, fetchUserAccountBalance } from '../controllers/userController.js'

const userRouter = express.Router();
// const storage = multer.memoryStorage(); // Stores file in memory (or use diskStorage for local storage)
// const upload = multer({ storage });


// userRouter.post('/create-user', createUser);
// userRouter.post('/sign-up', signUp);
// userRouter.post('/confirm-otp', confirmOTP);
// userRouter.post('/login', login);
// userRouter.post('/change-password', changePassword);
// userRouter.post('/logout', logout);
// userRouter.post('/forgot-password', forgotPassword);
// userRouter.post('/reset-password/:id', resetPassword);
// userRouter.patch('/reset-attempts/:id', resetLoginAttempts);
// userRouter.get('/users', fetchUsers);
// // userRouter.get('/users', authenticateToken, fetchUsers);
// userRouter.patch('/edit-user/:id', authenticateToken, editUser);
// userRouter.patch('/admin-edit-user/:id', authenticateToken, upload.single('photo'), adminEditUser);
// userRouter.patch('/edit-photo/:id', authenticateToken, upload.single('photo'), editPhoto);
// userRouter.delete('/delete-user/:id', deleteUser);
// // userRouter.delete('/delete-user/:id', authenticateToken, deleteUser);
// userRouter.delete('/delete-users', authenticateToken, deleteUsers);


userRouter.post('/create-user', createUser);
userRouter.post('/sign-up', signUp);
userRouter.post('/confirm-otp', confirmOTP);
userRouter.post('/login', login);
userRouter.post('/change-password', changePassword);
userRouter.post('/logout', logout);
userRouter.post('/forgot-password', forgotPassword);
userRouter.post('/reset-password/:id', resetPassword);
userRouter.patch('/reset-attempts/:id', resetLoginAttempts);
userRouter.get('/users', fetchUsers);
userRouter.get('/user', fetchUserAccountBalance);
userRouter.post('/fetch-receiver', fetchAccount);

userRouter.patch('/edit-user/:id', editUser);
userRouter.patch('/admin-edit-user/:id', upload.single('photo'), adminEditUser);
userRouter.patch('/edit-photo/:id', upload.single('photo'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }
    res.json({ message: "Upload successful!", file: req.file });
});
// userRouter.patch('/edit-photo/:id',  upload.single('photo'), editPhoto);

userRouter.delete('/delete-user/:id', deleteUser);

userRouter.delete('/delete-users', deleteUsers);
userRouter.post('/transfer-fund', transferFund);
userRouter.post('/admin-transfer-fund', adminTransferFund);


export default userRouter;