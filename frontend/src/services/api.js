import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const documentAPI = {
    upload: async (file, onProgress) => {
        const formData = new FormData();
        formData.append('document', file);

        const response = await axios.post(`${API_URL}/api/documents/upload`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            onUploadProgress: (progressEvent) => {
                if (onProgress) {
                    const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    onProgress(percentCompleted);
                }
            }
        });

        return response.data;
    },

    getAll: async () => {
        const response = await axios.get(`${API_URL}/api/documents`);
        return response.data;
    },

    getById: async (id) => {
        const response = await axios.get(`${API_URL}/api/documents/${id}`);
        return response.data;
    },

    delete: async (id) => {
        const response = await axios.delete(`${API_URL}/api/documents/${id}`);
        return response.data;
    },

    getStats: async () => {
        const response = await axios.get(`${API_URL}/api/documents/stats`);
        return response.data;
    }
};

export const queryAPI = {
    ask: async (question) => {
        const response = await axios.post(`${API_URL}/api/queries/ask`, { question });
        return response.data;
    },

    getHistory: async (page = 1, limit = 20) => {
        const response = await axios.get(`${API_URL}/api/queries`, {
            params: { page, limit }
        });
        return response.data;
    },

    getById: async (id) => {
        const response = await axios.get(`${API_URL}/api/queries/${id}`);
        return response.data;
    },

    delete: async (id) => {
        const response = await axios.delete(`${API_URL}/api/queries/${id}`);
        return response.data;
    },

    clearHistory: async () => {
        const response = await axios.delete(`${API_URL}/api/queries/clear`);
        return response.data;
    }
};
