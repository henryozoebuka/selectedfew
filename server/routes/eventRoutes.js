import express from 'express';
import upload from '../middlewares/uploadMiddleware.js';
import authenticateToken from '../middlewares/authenticateToken.js';

import { createEvent, deleteEvent, deleteEvents, editEvent, fetchEvents } from '../controllers/eventController.js';

const eventRouter = express.Router();

eventRouter.post('/create-event', upload.single('thumbnail'), createEvent);
eventRouter.get('/events', fetchEvents);
eventRouter.patch('/edit-event/:id', upload.single('thumbnail'), editEvent);
eventRouter.delete('/delete-event', deleteEvent);
eventRouter.delete('/delete-events', deleteEvents);

export default eventRouter;