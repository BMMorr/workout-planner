import axios from 'axios';
import { put, takeEvery } from 'redux-saga/effects';

function* fetchImages() {
    try {
        console.log('fetch images saga is triggered');
        const response = yield axios({
            method: 'GET',
            url: '/api/info',
        })
        yield put({
            type: 'SET_EXERCISE',
            payload: response.data
        })
    } catch (error) {
        console.log('fetch image /api/exerciseimage error', error);
    }
}

// function* fetchExercises(action) {
//     try {
//       const response = yield axios.get(`/api/info?query=${action.payload}`);
//       const exerciseImages = response.data.map((result) => ({
//         id: result.id,
//         exercisebase: result.exercise_base,
//         name: result.name,
//         description: result.description,
//         muscles: result.muscles,
//         muscles_secondary: result.muscles_secondary,
//       }));
//       yield put({
//         type: 'SET_FILTERED_EXERCISES',
//         payload: exerciseImages,
//       });
//     } catch (error) {
//       console.log('fetch exercise error:', error);
//     }
//   }


function* wgerSaga() {
    yield takeEvery('GET_EXERCISE', fetchImages);
    // yield takeEvery('GET_EXERCISE', fetchExercises);
}
export default wgerSaga;