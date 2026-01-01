import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    fileName: {
        type: String,
        required: [true, 'File name is required'],
        trim: true
    },
    originalName: {
        type: String,
        required: true
    },
    fileType: {
        type: String,
        enum: ['pdf', 'txt'],
        required: true
    },
    filePath: {
        type: String,
        required: true
    },
    fileSize: {
        type: Number,
        required: true
    },
    extractedText: {
        type: String,
        default: ''
    },
    status: {
        type: String,
        enum: ['processing', 'completed', 'failed'],
        default: 'processing'
    },
    errorMessage: {
        type: String,
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    processedAt: {
        type: Date,
        default: null
    }
});

documentSchema.index({ userId: 1, createdAt: -1 });

const Document = mongoose.model('Document', documentSchema);

export default Document;
