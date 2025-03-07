import express from 'express';
import authenticateToken from '../middlewares/authenticateToken.js';

import { fetchTransactionHistory, fetchUserTransactionHistory } from '../controllers/transactionHistoryController.js';

const transactionHistoryRouter = express.Router();


transactionHistoryRouter.get('/fetch-transaction-history', fetchTransactionHistory);
transactionHistoryRouter.get('/fetch-user-transaction-history', fetchUserTransactionHistory);

export default transactionHistoryRouter;