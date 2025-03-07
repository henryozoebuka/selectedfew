import express from 'express';
import upload from '../middlewares/uploadMiddleware.js';
import authenticateToken from '../middlewares/authenticateToken.js';

import { adminFetchFundTransfers, approveClubTransfer, approveFundTransfer, clubTransferRequest, fetchPaymentApprovals, fetchPendingPaymentApproval, fetchUserPaymentApprovals, rejectClubTransfer, rejectPayment, requestPaymentApproval } from '../controllers/paymentApprovalController.js';

const paymentApprovalRouter = express.Router();

paymentApprovalRouter.post('/request-payment-approval', requestPaymentApproval);
paymentApprovalRouter.post('/request-admin-transfer-fund-approval', clubTransferRequest);
paymentApprovalRouter.get('/payment-approvals', fetchPaymentApprovals);
paymentApprovalRouter.get('/user-payment-approvals', fetchUserPaymentApprovals);
paymentApprovalRouter.get('/club-fund-transfers', adminFetchFundTransfers);
paymentApprovalRouter.get('/pending-payment-approvals', fetchPendingPaymentApproval);
paymentApprovalRouter.patch('/approve-club-transfer', approveClubTransfer);
paymentApprovalRouter.patch('/approve-payment', approveFundTransfer);
paymentApprovalRouter.post('/reject-club-transfer', rejectClubTransfer);
paymentApprovalRouter.post('/reject-payment', rejectPayment);

export default paymentApprovalRouter;