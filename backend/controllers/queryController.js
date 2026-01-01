import QueryHistory from '../models/QueryHistory.js';
import Document from '../models/Document.js';
import { generateAnswer } from '../utils/aiService.js';

export const askQuestion = async (req, res) => {
    try {
        const { question } = req.body;

        if (!question || question.trim().length === 0) {
            return res.status(400).json({
                success: false,
                message: 'Please provide a question'
            });
        }

        const documents = await Document.find({
            userId: req.userId,
            status: 'completed'
        }).select('fileName extractedText');

        const { answer, references } = await generateAnswer(question, documents);

        const queryHistory = new QueryHistory({
            userId: req.userId,
            question: question.trim(),
            answer: answer,
            references: references
        });

        await queryHistory.save();

        res.status(200).json({
            success: true,
            data: {
                query: {
                    id: queryHistory._id,
                    question: queryHistory.question,
                    answer: queryHistory.answer,
                    references: queryHistory.references,
                    createdAt: queryHistory.createdAt
                }
            }
        });
    } catch (error) {
        console.error('Ask question error:', error);
        res.status(500).json({
            success: false,
            message: 'Error processing question',
            error: error.message
        });
    }
};

export const getQueryHistory = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const skip = (page - 1) * limit;

        const queries = await QueryHistory.find({ userId: req.userId })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const total = await QueryHistory.countDocuments({ userId: req.userId });

        res.status(200).json({
            success: true,
            data: {
                queries: queries.map(q => ({
                    id: q._id,
                    question: q.question,
                    answer: q.answer,
                    references: q.references,
                    createdAt: q.createdAt
                })),
                pagination: {
                    page,
                    limit,
                    total,
                    pages: Math.ceil(total / limit)
                }
            }
        });
    } catch (error) {
        console.error('Get query history error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching query history',
            error: error.message
        });
    }
};

export const getQuery = async (req, res) => {
    try {
        const query = await QueryHistory.findOne({
            _id: req.params.id,
            userId: req.userId
        });

        if (!query) {
            return res.status(404).json({
                success: false,
                message: 'Query not found'
            });
        }

        res.status(200).json({
            success: true,
            data: {
                query: {
                    id: query._id,
                    question: query.question,
                    answer: query.answer,
                    references: query.references,
                    createdAt: query.createdAt
                }
            }
        });
    } catch (error) {
        console.error('Get query error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching query',
            error: error.message
        });
    }
};

export const deleteQuery = async (req, res) => {
    try {
        const query = await QueryHistory.findOne({
            _id: req.params.id,
            userId: req.userId
        });

        if (!query) {
            return res.status(404).json({
                success: false,
                message: 'Query not found'
            });
        }

        await QueryHistory.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: 'Query deleted successfully'
        });
    } catch (error) {
        console.error('Delete query error:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting query',
            error: error.message
        });
    }
};

export const clearHistory = async (req, res) => {
    try {
        await QueryHistory.deleteMany({ userId: req.userId });

        res.status(200).json({
            success: true,
            message: 'Query history cleared successfully'
        });
    } catch (error) {
        console.error('Clear history error:', error);
        res.status(500).json({
            success: false,
            message: 'Error clearing history',
            error: error.message
        });
    }
};
