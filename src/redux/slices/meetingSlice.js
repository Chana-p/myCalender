import { createSlice } from "@reduxjs/toolkit";
import { addmeetingThunk } from "./addMeetingThunk";
import { getmeetingsThunk } from "./getMeetingsThunk";
import { editmeetingThunk } from "./editMeetingThunk";
import { deletemeetingThunk } from "./deleteMeetingThunk";
import { searchmeetingThunk } from "./searchMeetingThunk";

export const INITAIL_STATE_meetingS = {
    meetings: [{
        name: "",
        date: new Date(),
        time: new Date().getTime(),
        description: "",
        id: ""
    }]
    , searchmeetings: [{
        name: "",
        date: new Date(),
        time: new Date().getTime(),
        description: "",
        id: ""
    }]

}

export const meetingsSlice = createSlice({
    name: 'meetings',
    initialState: INITAIL_STATE_meetingS,
    // reducers: {

    //     editmeetings: (state, action) => {
    //         state.meetings = action.payload;
    //     },

    // },
    extraReducers: (builder) => {


        //addmeeting:
        // הוספת מקרה שהט'נק התחיל
        builder.addCase(addmeetingThunk.pending, (state) => {
        });
        // הוספת מקרה שהט'נק הסתיים בהצלחה
        builder.addCase(addmeetingThunk.fulfilled, (state, action) => {
            //let id = action.payload;
            //state.meetings//.id;
            //state.sucsses = true;
            console.log("action:success ", action);
        });
        // הוספת מקרה שהט'נק נכשל 
        builder.addCase(addmeetingThunk.rejected, (state, action) => {
            //state.token=-2;
            console.log("action:failed ", action);
        });
        //getmeeting:
        // הוספת מקרה שהט'נק התחיל
        builder.addCase(getmeetingsThunk.pending, (state) => {
        });
        // הוספת מקרה שהט'נק הסתיים בהצלחה
        builder.addCase(getmeetingsThunk.fulfilled, (state, action) => {
            state.meetings = action.payload;
            console.log("action:success ", action);
        });
        // הוספת מקרה שהט'נק נכשל 
        builder.addCase(getmeetingsThunk.rejected, (state, action) => {
            console.log("action:failed ", action);
        });
        //editmeeting:
        // הוספת מקרה שהט'נק התחיל
        builder.addCase(editmeetingThunk.pending, (state) => {
        });
        // הוספת מקרה שהט'נק הסתיים בהצלחה
        builder.addCase(editmeetingThunk.fulfilled, (state, action) => {
            //   state.meetings = action.payload;
            console.log("action:success ", action);
        });
        // הוספת מקרה שהט'נק נכשל 
        builder.addCase(editmeetingThunk.rejected, (state, action) => {
            console.log("action:failed ", action);
        });
        //deletemeeting:
        // הוספת מקרה שהט'נק הסתיים בהצלחה
        builder.addCase(deletemeetingThunk.fulfilled, (state, action) => {
            //   state.meetings = action.payload;
            console.log("action:success ", action);
        });
        // הוספת מקרה שהט'נק נכשל 
        builder.addCase(deletemeetingThunk.rejected, (state, action) => {
            console.log("action:failed ", action);
        });
        //searchmeeting:
      
        // הוספת מקרה שהט'נק הסתיים בהצלחה
        builder.addCase(searchmeetingThunk.fulfilled, (state, action) => {
            state.searchmeetings = action.payload;
            for (let i = 0; i < state.searchmeetings.length; i++) {
                   var d=new Date(state.searchmeetings[i].date);
                   state.searchmeetings[i].date=d.toLocaleDateString();
                   
            }
          
            console.log("action:success ", action);
        });
        // הוספת מקרה שהט'נק נכשל 
        builder.addCase(searchmeetingThunk.rejected, (state, action) => {
            console.log("action:failed ", action);
        });
    }
});

// export const { editmeetings } = meetingsSlice.actions;