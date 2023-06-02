const startReducer = (state = [], action) => {
    switch (action.type) {
        case "SET_START":
            return action.payload;
        case 'ADD_EXERCISE_SUCCESS':
            return [...state, action.payload];
        case 'DELETE_EXERCISE_SUCCESS':
            return state.filter((exercise) => exercise.id !== action.payload);
        default:
            return state;
    }
};

export default startReducer;