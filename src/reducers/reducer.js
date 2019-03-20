function reducer(state={
    cdrcount: [],
    acctusages: []
    }, action){
    switch(action.type){
        case 'cdrcount':
            return {
                cdrcount: action.cdrcount,
                acctusages: state.acctusages
            }
        case 'acctusages':
            return {
                acctusages: action.acctusages,
                cdrcount: state.cdrcount
            }
        default: 
            return state;
    }
}

export default reducer;