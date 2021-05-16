import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import editStudentSliceReducer from "../reducers/student/editStudentSlice";

export default configureStore({
    reducer: {
        student: editStudentSliceReducer
    },
    middleware: getDefaultMiddleware({
        serializableCheck: false,
    })
});