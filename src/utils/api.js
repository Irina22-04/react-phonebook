import axios from 'axios';

import {BASE_URL} from '../config';

export const getContactById = async (id) => {
    return axios(`${BASE_URL}/users/${id}`);
};

export const getAllContacts = async () => {
    return axios(`${BASE_URL}/users?_sort=surname`);
};

export const getStructure = async () => {
    return axios(`${BASE_URL}/structure`);
};

export const updateStructure = async ({id, ...notId}) => {
    return axios.put(`${BASE_URL}/structure/${id}`, notId);
};

export const getEmployeesByStructure = async (department) => {
    return axios(`${BASE_URL}/users?department_like=^${department}$`);
};

export const deleteContact = (contactId) => {
    return axios.delete(`${BASE_URL}/users/${contactId}`);
};

export const editContact = ({id, ...other}) => {
    return axios.patch(`${BASE_URL}/users/${id}`, other);
};

export const deleteStructure = (departmentId) => {
    return axios.delete(`${BASE_URL}/structure/${departmentId}`);
};

export const addStructure = (department) => {
    return axios.post(`${BASE_URL}/structure`, department);
};

export const loginUser = (user) => {
    return axios.post(`${BASE_URL}/login`, user);
};

export const addContact = (contact) => {
    return axios.post(`${BASE_URL}/register`, contact);
};