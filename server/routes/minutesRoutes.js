import express from 'express';
import upload from '../middlewares/uploadMiddleware.js';
import authenticateToken from '../middlewares/authenticateToken.js';

import { createMinutes, deleteMinutes, deleteMinutesArchive, editMinutes, fetchMinutesArchive } from '../controllers/minutesController.js';

const minutesRouter = express.Router();

minutesRouter.post('/create-minutes', upload.single('thumbnail'), createMinutes);
minutesRouter.get('/minutes-archive', fetchMinutesArchive);
minutesRouter.patch('/edit-minutes/:id', upload.single('thumbnail'), editMinutes);
minutesRouter.delete('/delete-minutes', deleteMinutes);
minutesRouter.delete('/delete-minutes-archive', deleteMinutesArchive);

export default minutesRouter;