import { createSlice } from "@reduxjs/toolkit";
import { logInThunk } from "./logInThunk";
import { addUserThunk } from "./addUserThunk";

export const INITAIL_STATE_USER = {
    username: "",
    password: "",
    token: -1,
    sucsses: false ,
     failed: false
}
export const userSlice = createSlice({
    name: 'user',
    initialState: INITAIL_STATE_USER,
    reducers: {

        editUsername: (state, action) => {
            state.username = action.payload;
        },
        editPassword: (state, action) => {
            state.password = action.payload;
        },
        editToken: (state, action) => {
            state.token = action.payload;
        }
    },
    extraReducers: (builder) => {

        // הוספת מקרה שהט'נק התחיל
        builder.addCase(logInThunk.pending, (state) => {
        });
        // הוספת מקרה שהט'נק הסתיים בהצלחה
        builder.addCase(logInThunk.fulfilled, (state, action) => {
            state.token = action.payload;//.id;
           state.sucsses = true;
            console.log("state.token" + state.token);
        });
        // הוספת מקרה שהט'נק נכשל 
        builder.addCase(logInThunk.rejected, (state, action) => {
            state.failed = true;
            console.log("action: ", action);
        });
         // הוספת מקרה שהט'נק התחיל
         builder.addCase(addUserThunk.pending, (state) => {
        });
        // הוספת מקרה שהט'נק הסתיים בהצלחה
        builder.addCase(addUserThunk.fulfilled, (state, action) => {
            state.token = action.payload;//.id;
           state.sucsses = true;
        });
        // הוספת מקרה שהט'נק נכשל 
        builder.addCase(addUserThunk.rejected, (state, action) => {
            state.token=-2;
            console.log("action: ", action);
        });
        

    }
});

export const { editUsername, editPassword, editToken } = userSlice.actions;