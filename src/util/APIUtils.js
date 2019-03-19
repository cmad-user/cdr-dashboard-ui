import { API_BASE_URL, ACCESS_TOKEN } from '../constants';
import store from '../stores/store.js';

const request = (options) => {
    const headers = new Headers({
        'Content-Type': 'application/json',
    })

    if (localStorage.getItem(ACCESS_TOKEN)) {
        headers.append('Authorization', 'Bearer ' + localStorage.getItem(ACCESS_TOKEN))
    }

    const defaults = { headers: headers };
    options = Object.assign({}, defaults, options);

    return fetch(options.url, options)
        .then(response => handleResponse(response));
};

function handleResponse(response) {
    return response.json().then(json => {
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                window.location.reload();
               // location.reload(true);
            }
            return Promise.reject(json);
        }
        return json;
    });
}

export function fetchCdrCount() {
    request({
        url: API_BASE_URL+"/cdrs/count",
        method: 'GET',
    }).then(function(cdrcount){
        store.dispatch({
            type: 'cdrcount',
            cdrcount: cdrcount
        });
    });
};

export function fetchCdrs(reqURL){
    return request({
        url: API_BASE_URL+reqURL,
        method: 'GET',
    })
}

export function login(loginRequest) {
    return request({
        url: API_BASE_URL + "/auth/signin",
        method: 'POST',
        body: JSON.stringify(loginRequest)
    });
}

export function signup(signupRequest) {
    return request({
        url: API_BASE_URL + "/auth/signup",
        method: 'POST',
        body: JSON.stringify(signupRequest)
    });
}

export function checkUsernameAvailability(username) {
    return request({
        url: API_BASE_URL + "/user/checkUsernameAvailability?username=" + username,
        method: 'GET'
    });
}

export function checkEmailAvailability(email) {
    return request({
        url: API_BASE_URL + "/user/checkEmailAvailability?email=" + email,
        method: 'GET'
    });
}


export function getCurrentUser() {
    if (!localStorage.getItem(ACCESS_TOKEN)) {
        return Promise.reject("No access token set.");
    }

    return request({
        url: API_BASE_URL + "/user/me",
        method: 'GET'
    });
}

export function getUserProfile(username) {
    return request({
        url: API_BASE_URL + "/user/" + username,
        method: 'GET'
    });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem(ACCESS_TOKEN);
}