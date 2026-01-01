import mongoose from 'mongoose';

const queryHistorySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    question: {
        type: String,
        required: [true, 'Question is required'],
        trim: true
    },
    answer: {
        type: String,
        required: [true, 'Answer is required']
    },
    references: [{
        documentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Document'
        },
        documentName: {
            type: String,
            required: true
        },
        excerpt: {
            type: String,
            required: true
        }
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

queryHistorySchema.index({ userId: 1, createdAt: -1 });

const QueryHistory = mongoose.model('QueryHistory', queryHistorySchema);

export default QueryHistory;
