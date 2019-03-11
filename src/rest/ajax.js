import store from '../stores/store.js';
import { API_BASE_URL, POLL_LIST_SIZE, ACCESS_TOKEN } from '../constants';

function fetchMessageCount() {
    return fetch(API_BASE_URL+"messages/count").then(function(response){
            return response.json();
        }).then(function(messagecount){
            store.dispatch({
                type: 'messagecount',
                messagecount: messagecount
            });
        });
};

export default fetchMessageCount;
