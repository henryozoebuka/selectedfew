import express from 'express';
import upload from '../middlewares/uploadMiddleware.js';
import authenticateToken from '../middlewares/authenticateToken.js';
import { createConstitution, editConstitution, fetchConstitution, fetchConstitutions } from '../controllers/constitutionController.js';

const constitutionRouter = express.Router();

constitutionRouter.post('/create-constitution', upload.single('thumbnail'), createConstitution);
constitutionRouter.get('/constitution', fetchConstitution);
constitutionRouter.get('/constitutions', fetchConstitutions);
constitutionRouter.patch('/edit-constitution/:id', editConstitution);

export default constitutionRouter;