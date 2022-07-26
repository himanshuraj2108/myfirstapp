

import { call, put, takeEvery } from 'redux-saga/effects';



function* handleSaga() {

    try {
        const Api = "https://jsonplaceholder.typicode.com/todos";
        let data = yield fetch(Api)
        //let data = yield call(Api.fetch)
        data = yield data.json();
        data = data.slice(0, 5)
        yield put({ type: "FETCH_DATA", data })
    } catch (e) {
        console.log(e)
    }

}
export function* watchSaga() {
    yield takeEvery("REQUEST_DATA", handleSaga)
}