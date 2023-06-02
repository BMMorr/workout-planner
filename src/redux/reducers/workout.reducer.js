const initialState = {
  completedWorkouts: [],
  exerciseData: [],
};

const workoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_COMPLETE':
      const { workoutId, exercises } = action.payload;
      const completedWorkouts = exercises.map((exercise) => ({
        workout_id: workoutId,
        exercise_id: exercise.exerciseId,
        sets: exercise.sets,
        reps: exercise.reps,
        weight: exercise.weight,
      }));

      return {
        ...state,
        completedWorkouts: [...state.completedWorkouts, ...completedWorkouts],
      };

    case 'ADD_EXERCISE_DATA':
      console.log('ADD_EXERCISE_DATA Action:', action);

      return {
        ...state,
        exerciseData: [
          ...state.exerciseData,
          {
            workout_id: action.payload.workoutId,
            exercise_id: action.payload.exerciseId,
            sets: action.payload.sets,
            reps: action.payload.reps,
            weight: action.payload.weight,
          },
        ],
      };

    default:
      return state;
  }
};

export default workoutReducer;
