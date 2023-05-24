const workdataReducer = (state = [], action) => {
    switch (action.type) {
        case "SET_WORKDATA":
            return action.payload;
        default:
            return state;
    }
};

export default workdataReducer;