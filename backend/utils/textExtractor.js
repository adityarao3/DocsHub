import pdfParse from 'pdf-parse';
import fs from 'fs/promises';
import path from 'path';

export const extractPdfText = async (filePath) => {
    try {
        const dataBuffer = await fs.readFile(filePath);
        const data = await pdfParse(dataBuffer);

        return data.text.trim();
    } catch (error) {
        console.error('PDF extraction error:', error);
        throw new Error(`Failed to extract text from PDF: ${error.message}`);
    }
};

export const extractTxtText = async (filePath) => {
    try {
        const text = await fs.readFile(filePath, 'utf-8');
        return text.trim();
    } catch (error) {
        console.error('TXT extraction error:', error);
        throw new Error(`Failed to read TXT file: ${error.message}`);
    }
};

export const extractText = async (filePath, fileType) => {
    if (fileType === 'pdf') {
        return await extractPdfText(filePath);
    } else if (fileType === 'txt') {
        return await extractTxtText(filePath);
    } else {
        throw new Error('Unsupported file type');
    }
};

export const deleteFile = async (filePath) => {
    try {
        await fs.unlink(filePath);
    } catch (error) {
        console.error('File deletion error:', error);
    }
};
