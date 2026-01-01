import express from 'express';
import {
    askQuestion,
    getQueryHistory,
    getQuery,
    deleteQuery,
    clearHistory
} from '../controllers/queryController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.use(authenticate);

router.post('/ask', askQuestion);

router.get('/', getQueryHistory);

router.delete('/clear', clearHistory);

router.get('/:id', getQuery);

router.delete('/:id', deleteQuery);

export default router;
