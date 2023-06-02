import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

const addExerciseData = (workoutId, exerciseId, sets, reps, weight) => ({
    type: 'ADD_EXERCISE_DATA',
    payload: {
        workoutId,
        exerciseId,
        sets,
        reps,
        weight,
    },
});

// Worker saga for handling ADD_COMPLETE action
function* handleAddComplete(action) {
    try {
        // Insert completed workout to the server/database and get the created completed_workout_id
        const completedWorkoutResponse = yield axios({
            method: 'POST',
            url: '/api/workdata/complete',
            data: action.payload,
        });

        // Insert exercise data for the completed workout
        const exercises = action.payload.exercises;
        for (let i = 0; i < exercises.length; i++) {
            const exercise = exercises[i];
            yield put(
                addExerciseData(
                    action.payload.workoutId,
                    exercise.exerciseId,
                    exercise.sets,
                    exercise.reps,
                    exercise.weight,
                ),
            );
        }
    } catch (error) {
        console.log('Error:', error);
        // Handle error
    }
}

// Watcher saga
function* workoutSaga() {
    yield takeEvery('ADD_COMPLETE', handleAddComplete);
    console.log('Workout Saga Initialized');
}

export default workoutSaga;
