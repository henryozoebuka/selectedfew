import express from 'express';
import mongoose from 'mongoose';
import serverless from 'serverless-http';
import dotenv from 'dotenv';
import cors from 'cors';
import userRouter from './routes/userRoutes.js';
import postRouter from './routes/postRoutes.js';
import cookieParser from 'cookie-parser';
import announcementRouter from './routes/announcementRoutes.js';
import minutesRouter from './routes/minutesRoutes.js';
import eventRouter from './routes/eventRoutes.js';
import paymentRouter from './routes/paymentRoutes.js';
import paymentApprovalRouter from './routes/paymentApprovalRoutes.js';
import constitutionRouter from './routes/constitutionRoutes.js';
import transactionHistoryRouter from './routes/transactionHistoryRoutes.js';
dotenv.config();

const app = express();

app.use(cors({
    origin: 'http://localhost:8081',  // The URL of your frontend (for example: )
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    credentials: true,
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', userRouter);
app.use('/', postRouter);
app.use('/', announcementRouter);
app.use('/', minutesRouter);
app.use('/', eventRouter);
app.use('/', constitutionRouter);
app.use('/', paymentRouter);
app.use('/', paymentApprovalRouter);
app.use('/', transactionHistoryRouter);

// const PORT = process.env.PORT || 8000;

const startServer = () => {
    try {
        mongoose.connect(process.env.MONGO_URI);
        console.log('connected to database');
        // app.listen(PORT, () => {
        //     console.log(`Connected on port ${PORT}`);
        // })
    } catch (error) {
        console.error(error);
    }
}

startServer();

export const handler = serverless(app);