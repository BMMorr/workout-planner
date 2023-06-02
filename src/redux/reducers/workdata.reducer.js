const workdataReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_WORKDATA':
            return action.payload;
        case 'DELETE_WORKOUT':
            const deletedWorkoutId = action.payload;
            console.log('Deleting workout with ID here:', deletedWorkoutId);
            // Filter out the deleted workout based on its ID
            const updatedWorkouts = state.filter(workout => workout.id !== deletedWorkoutId);
            console.log('Updated workouts:', updatedWorkouts);
            return updatedWorkouts;
        default:
            return state;
    }
};

export default workdataReducer;