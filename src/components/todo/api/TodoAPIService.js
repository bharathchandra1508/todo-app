import axios from "axios";

const apiClient = axios.create({
    baseURL: 'http://localhost:8080'
});

export const retrieveAllTodosForUsername = (username) => apiClient.get(`/users/${username}/todos`);

export const deleteTodoAPI
    = (username, id) => apiClient.delete(`/users/${username}/todos/${id}`);

export const retrieveTodoAPI
    = (username, id) => apiClient.get(`/users/${username}/todos/${id}`);