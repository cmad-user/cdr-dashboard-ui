import store from '../stores/store.js';

function fetchMessageCount() {
    return fetch('messages/count').then(function(response){
            return response.json();
        }).then(function(messagecount){
            store.dispatch({
                type: 'messagecount',
                messagecount: messagecount
            });
        });
};

export default fetchMessageCount;
