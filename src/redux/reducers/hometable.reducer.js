const homeTableReducer = (state = [], action) => {
    switch (action.type) {
        case "SET_WORKOUT_HOME":
            return action.payload;
        default:
            return state;
    }
};

export default homeTableReducer;