import axios from 'axios';

export const authentication = (api, data = null) => {
    return new Promise((resolve, reject) => {
        axios
            .post(api, data)
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
            .get(api, data)
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
            .post("http://127.0.0.1:8000" + api, data)
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
            .delete("http://127.0.0.1:8000" + api, data)
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
            .patch("http://127.0.0.1:8000" + api, data)
            .then((response) => {
                resolve(response?.data);
            })
            .catch((error) => {
                reject(error);
            });
    })
}