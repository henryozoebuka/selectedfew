import express from 'express';
import { createPayment, deletePayment, deletePayments, fetchPayments, fetchUserPayments, makePayment } from '../controllers/paymentController.js';

const paymentRouter = express.Router();

paymentRouter.post('/create-payment', createPayment);
paymentRouter.get('/payments', fetchPayments);
paymentRouter.get('/user-payments/:id', fetchUserPayments);
paymentRouter.patch('/make-payment', makePayment);
paymentRouter.delete('/delete-payment/:id', deletePayment);
paymentRouter.delete('/delete-payments', deletePayments);

export default paymentRouter;