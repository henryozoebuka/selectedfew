import express from 'express';
import upload from '../middlewares/uploadMiddleware.js';
import authenticateToken from '../middlewares/authenticateToken.js';

import { createAnnouncement, deleteAnnouncement, deleteAnnouncements, editAnnouncement, fetchAnnouncements } from '../controllers/announcementController.js';

const announcementRouter = express.Router();

// announcementRouter.post('/create-announcement', authenticateToken, upload.single('thumbnail'), createAnnouncement);
// announcementRouter.get('/announcements', fetchAnnouncements);
// announcementRouter.patch('/edit-announcement/:id', authenticateToken, upload.single('thumbnail'), editAnnouncement);
// announcementRouter.delete('/delete-announcement/:id', authenticateToken, deleteAnnouncement);
// announcementRouter.delete('/delete-announcements', authenticateToken, deleteAnnouncements);


announcementRouter.post('/create-announcement', upload.single('thumbnail'), createAnnouncement);
announcementRouter.get('/announcements', fetchAnnouncements);
announcementRouter.patch('/edit-announcement/:id', upload.single('thumbnail'), editAnnouncement);
announcementRouter.delete('/delete-announcement', deleteAnnouncement);
announcementRouter.delete('/delete-announcements', deleteAnnouncements);

export default announcementRouter;