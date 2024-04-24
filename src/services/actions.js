import axios from 'axios';

const BASE_URL = "https://amazon-replica-fastapi.onrender.com";
export const authentication = (api, data = null) => {
    return new Promise((resolve, reject) => {
        axios
            .post(BASE_URL + api, data)
            .then((response) => {
                resolve(response?.data);
            })
            .catch((error) => {
                reject(error?.response?.data);
            });
    });
};

export const getData = (api, data = null) => {
    return new Promise((resolve, reject) => {
        axios
            .get(BASE_URL + api, data)
            .then((response) => {
                resolve(response?.data);
            })
            .catch((error) => {
                reject(error);
            });
    })
}

export const postData = (api, data = null) => {
    return new Promise((resolve, reject) => {
        axios
            .post(BASE_URL + api, data)
            .then((response) => {
                console.log('response', response)
                resolve(response?.data);
            })
            .catch((error) => {
                reject(error);
            });
    })
}

export const deleteData = (api, data = null) => {
    return new Promise((resolve, reject) => {
        axios
            .delete(BASE_URL + api, data)
            .then((response) => {
                resolve(response?.data);
            })
            .catch((error) => {
                reject(error);
            });
    })
}

export const patchData = (api, data = null) => {
    return new Promise((resolve, reject) => {
        axios
            .patch(BASE_URL + api, data)
            .then((response) => {
                resolve(response?.data);
            })
            .catch((error) => {
                reject(error);
            });
    })
}