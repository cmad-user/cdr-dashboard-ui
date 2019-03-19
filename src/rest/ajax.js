import store from '../stores/store.js';
import { API_BASE_URL, POLL_LIST_SIZE, ACCESS_TOKEN } from '../constants';

function fetchCdrCount() {
    return fetch(API_BASE_URL+"cdrs/count").then(function(response){
            return response.json();
        }).then(function(cdrcount){
            store.dispatch({
                type: 'cdrcount',
                cdrcount: cdrcount
            });
        });
};

export default fetchCdrCount;
