function user(state={
    messagecount: []
}, action){
switch(action.type){
    case 'messagecount':
        return {
            messagecount: action.messagecount
        }
    default: 
        return state;
}
}

export default user;