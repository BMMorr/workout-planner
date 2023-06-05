import { put, takeLatest } from 'redux-saga/effects';

function* addToTable(action) {
  const { payload } = action;
  yield put({ type: 'SET_TO_TABLE', payload });
}
function* deleteFromTable(action) {
  const { payload } = action;
  yield put({ type: 'DELETE_FROM_TABLE', payload });
}

function* workTableSaga() {
  yield takeLatest('ADD_TO_TABLE', addToTable);
  yield takeLatest('DELETE_EXERCISE_TABLE', deleteFromTable);

}

export default workTableSaga;