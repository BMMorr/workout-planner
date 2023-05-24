import { put, takeLatest } from 'redux-saga/effects';

function* addToTable(action) {
  const { payload } = action;
  yield put({ type: 'SET_TO_TABLE', payload });
}

function* workTableSaga() {
  yield takeLatest('ADD_TO_TABLE', addToTable);
}

export default workTableSaga;