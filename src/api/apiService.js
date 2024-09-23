// src/apiService.js
import { api } from './api';

// Define functions for each endpoint
export const fetchTextWorkers = () => api.post('api/text-workers');
export const fetchTextModels = () => api.post('api/text-models');
export const fetchStatus = () => api.post('api/status');
export const cancelTask = (taskId) => api.post('api/cancel-task', { taskId });
export const generateText = (data) => api.post('api/generate-text', data);
export const fetchSdSamplers = () => api.post('api/sd-samplers');
export const fetchSdModels = () => api.post('api/sd-models');
export const captionImage = (image) => api.post('api/caption-image', { image });
export const userInfo = () => api.post('api/user-info');
export const generateImage = (data) => api.post('api/generate-image', data);
export const checkTaskStatus = (taskId) => api.post('api/task-status', { taskId });