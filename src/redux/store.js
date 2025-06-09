import { combineSlices, configureStore } from "@reduxjs/toolkit";
import {userSlice } from "./slices/userSlice";
import { meetingsSlice } from "./slices/meetingSlice";
import { tasksSlice } from "./slices/tasksSlice";

const reducers = combineSlices(userSlice,meetingsSlice,tasksSlice);


export const STORE = configureStore({
    reducer: reducers,

})