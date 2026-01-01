import express from 'express';
import {
    uploadDocument,
    getDocuments,
    getDocument,
    deleteDocument,
    getDocumentStats
} from '../controllers/documentController.js';
import { authenticate } from '../middleware/auth.js';
import upload from '../utils/upload.js';

const router = express.Router();

router.use(authenticate);

router.post('/upload', upload.single('document'), uploadDocument);

router.get('/', getDocuments);

router.get('/stats', getDocumentStats);

router.get('/:id', getDocument);

router.delete('/:id', deleteDocument);

export default router;
