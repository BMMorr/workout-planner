import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

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

function* workdataSaga() {
    yield takeEvery('ADD_WORKOUT', postWorkout);
    yield takeEvery('GET_WORKDATA', getWorkData);
    yield takeEvery('GET_WORKOUT_HOME', getWorkoutHome);
}
export default workdataSaga;