import Document from '../models/Document.js';
import { extractText, deleteFile } from '../utils/textExtractor.js';
import path from 'path';

export const uploadDocument = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'No file uploaded'
            });
        }

        const fileType = path.extname(req.file.originalname).toLowerCase().substring(1);

        const document = new Document({
            userId: req.userId,
            fileName: req.file.originalname,
            originalName: req.file.originalname,
            fileType: fileType,
            filePath: req.file.path,
            fileSize: req.file.size,
            status: 'processing'
        });

        await document.save();

        processDocument(document._id, req.file.path, fileType);

        res.status(201).json({
            success: true,
            message: 'Document uploaded successfully. Processing in progress.',
            data: {
                document: {
                    id: document._id,
                    fileName: document.fileName,
                    fileType: document.fileType,
                    fileSize: document.fileSize,
                    status: document.status,
                    createdAt: document.createdAt
                }
            }
        });
    } catch (error) {
        console.error('Upload error:', error);

        if (req.file) {
            await deleteFile(req.file.path);
        }

        res.status(500).json({
            success: false,
            message: 'Error uploading document',
            error: error.message
        });
    }
};

const processDocument = async (documentId, filePath, fileType) => {
    try {
        const extractedText = await extractText(filePath, fileType);

        await Document.findByIdAndUpdate(documentId, {
            extractedText: extractedText,
            status: 'completed',
            processedAt: new Date()
        });

        console.log(`✅ Document ${documentId} processed successfully`);
    } catch (error) {
        console.error(`❌ Error processing document ${documentId}:`, error);

        await Document.findByIdAndUpdate(documentId, {
            status: 'failed',
            errorMessage: error.message,
            processedAt: new Date()
        });
    }
};

export const getDocuments = async (req, res) => {
    try {
        const documents = await Document.find({ userId: req.userId })
            .select('-extractedText -filePath')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            data: {
                documents: documents.map(doc => ({
                    id: doc._id,
                    fileName: doc.fileName,
                    fileType: doc.fileType,
                    fileSize: doc.fileSize,
                    status: doc.status,
                    errorMessage: doc.errorMessage,
                    createdAt: doc.createdAt,
                    processedAt: doc.processedAt
                })),
                count: documents.length
            }
        });
    } catch (error) {
        console.error('Get documents error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching documents',
            error: error.message
        });
    }
};

export const getDocument = async (req, res) => {
    try {
        const document = await Document.findOne({
            _id: req.params.id,
            userId: req.userId
        });

        if (!document) {
            return res.status(404).json({
                success: false,
                message: 'Document not found'
            });
        }

        res.status(200).json({
            success: true,
            data: {
                document: {
                    id: document._id,
                    fileName: document.fileName,
                    fileType: document.fileType,
                    fileSize: document.fileSize,
                    status: document.status,
                    extractedText: document.extractedText,
                    errorMessage: document.errorMessage,
                    createdAt: document.createdAt,
                    processedAt: document.processedAt
                }
            }
        });
    } catch (error) {
        console.error('Get document error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching document',
            error: error.message
        });
    }
};

export const deleteDocument = async (req, res) => {
    try {
        const document = await Document.findOne({
            _id: req.params.id,
            userId: req.userId
        });

        if (!document) {
            return res.status(404).json({
                success: false,
                message: 'Document not found'
            });
        }

        await deleteFile(document.filePath);

        await Document.findByIdAndDelete(req.params.id);

        res.status(200).json({
            success: true,
            message: 'Document deleted successfully'
        });
    } catch (error) {
        console.error('Delete document error:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting document',
            error: error.message
        });
    }
};

export const getDocumentStats = async (req, res) => {
    try {
        const stats = await Document.aggregate([
            { $match: { userId: req.userId } },
            {
                $group: {
                    _id: '$status',
                    count: { $sum: 1 }
                }
            }
        ]);

        const totalSize = await Document.aggregate([
            { $match: { userId: req.userId } },
            {
                $group: {
                    _id: null,
                    totalSize: { $sum: '$fileSize' }
                }
            }
        ]);

        res.status(200).json({
            success: true,
            data: {
                stats: stats,
                totalSize: totalSize[0]?.totalSize || 0
            }
        });
    } catch (error) {
        console.error('Get stats error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching statistics',
            error: error.message
        });
    }
};
