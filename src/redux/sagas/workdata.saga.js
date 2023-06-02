import axios from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';

function* getWorkData() {
    try {
        console.log('fetch workdata');
        const response = yield axios({
            method: 'GET',
            url: '/api/workdata',
        })
        yield put({
            type: 'SET_WORKDATA',
            payload: response.data
        })
    } catch (error) {
        console.log('fetch /api/workdata error', error);
    }
}
function* getWorkoutHome() {
    try {
        console.log('fetch workdata/workout');
        const response = yield axios({
            method: 'GET',
            url: '/api/workdata/workout',
        })
        yield put({
            type: 'SET_WORKOUT_HOME',
            payload: response.data
        })
    } catch (error) {
        console.log('fetch /api/workdata/workout error', error);
    }
}
function* getStart(action) {
    try {
        console.log('fetch workdata/start/:id', action.payload);
        const response = yield axios({
            method: 'GET',
            url: `/api/workdata/start/${action.payload}`,
        })
        yield put({
            type: 'SET_START',
            payload: response.data
        })
    } catch (error) {
        console.log('fetch /api/workdata/start error', error);
    }
}
const deleteWorkoutAPI = async workoutId => {
    const response = await axios.delete(`/api/workdata/${workoutId}`);
    return response.data;
}
function* deleteWorkout(action) {
    try {
        const workoutId = action.payload;
        console.log('Deleting workout with ID:', workoutId);
        yield call(deleteWorkoutAPI, workoutId);
        console.log('Workout deleted successfully.');
        yield put({ type: 'DELETE_WORKOUT_SUCCESS', payload: { workoutId } });
        window.location.reload();
    } catch (error) {
        console.log('Error deleting workout:', error);
        yield put({ type: 'DELETE_WORKOUT_FAILURE', payload: error.message });
    }
}
function* postWorkout(action) {
    try {
        console.log('post workdata', action.payload);
        const response = yield axios({
            method: 'POST',
            url: '/api/workdata',
            data: action.payload
        })
        console.log(item.data);
        yield put({
            type: 'GET_WORKDATA',
        })
    } catch (error) {
        console.log('post /api/workdata error')
    }
}
const addEditExerciseAPI = async (insertData) => {
    const response = await axios.post('/api/workdata/exercise', insertData);
    return response.data;
}

function* addEditExercise(action) {
    try {
        const insertData = action.payload;
        console.log('post addEditExercise', insertData);
        yield call(addEditExerciseAPI, insertData);
        yield put({ type: 'GET_START', payload: insertData.workout_id });
    } catch (error) {
        console.log('post /api/workdata/exercise error', error);
    }
}

const deleteEditExerciseAPI = async exerciseID => {
    const response = await axios.delete(`/api/workdata/edit/${exerciseID}`);
    return response.data;
}
function* deleteEditExercise(action) {
    try {
        const deleteData = action.payload;
        const exerciseID = deleteData.exercise_id
        const workoutID = deleteData.workout_id
        console.log('Deleting exercise with ID:', exerciseID);
        yield call(deleteEditExerciseAPI, exerciseID);
        console.log('Exercise deleted successfully.');
        yield put({ type: 'GET_START', payload: workoutID });
    } catch (error) {
        console.log('Error deleting exercise:', error);
    }
}

const updateWorkoutNameAPI = async (updateData) => {
    const response = await axios.put('/api/workdata/update', updateData);
    return response.data;
}
function* updateWorkoutName(action) {
    try {
        const updateData = action.payload;
        const workoutID = updateData.workout_id
        console.log('update workout name:', updateData);
        yield call(updateWorkoutNameAPI, updateData);
        console.log('updated successfully.');
        yield put({ type: 'GET_START', payload: workoutID });
    } catch (error) {
        console.log('update error /api/workdata/update:', error);
    }
}

function* workdataSaga() {
    yield takeEvery('ADD_WORKOUT', postWorkout);
    yield takeEvery('GET_WORKDATA', getWorkData);
    yield takeEvery('GET_WORKOUT_HOME', getWorkoutHome);
    yield takeEvery('GET_START', getStart);
    yield takeEvery('DELETE_WORKOUT', deleteWorkout);
    yield takeEvery('ADD_EDIT_EXERCISE', addEditExercise);
    yield takeEvery('DELETE_EXERCISE', deleteEditExercise);
    yield takeEvery('UPDATE_WORKOUT_NAME', updateWorkoutName);
}
export default workdataSaga;