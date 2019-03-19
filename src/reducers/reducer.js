function reducer(state={
    cdrcount: []
    }, action){
    switch(action.type){
        case 'cdrcount':
            return {
                cdrcount: action.cdrcount
            }
        default: 
            return state;
    }
}

export default reducer;