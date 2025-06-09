import { createSlice } from "@reduxjs/toolkit";
import { addTaskThunk, addtaskThunk } from "./addTaskThunk";
import { gettasksThunk } from "./getTasksThunk";
import { editTaskThunk, edittaskThunk } from "./editTaskThunk";
// import { deletetaskThunk } from "./deletetaskThunk";
// import { searchtaskThunk } from "./searchtaskThunk";

export const INITAIL_STATE_TASKS = {
    tasks: [{
        name: "",
        date: new Date(),
        time: new Date().getTime(),
        description: "",
        finished: false,
        id: ""
    }]
    , searchtasks: [{
        name: "",
        date: new Date(),
        time: new Date().getTime(),
        finished: false,
        description: "",
        id: ""
    }]

}

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState: INITAIL_STATE_TASKS,
    // reducers: {

    //     edittasks: (state, action) => {
    //         state.tasks = action.payload;
    //     },

    // },
    extraReducers: (builder) => {


        //addtask:
        // הוספת מקרה שהט'נק התחיל
        builder.addCase(addTaskThunk.pending, (state) => {
        });
        // הוספת מקרה שהט'נק הסתיים בהצלחה
        builder.addCase(addTaskThunk.fulfilled, (state, action) => {
            //let id = action.payload;
            //state.tasks//.id;
            //state.sucsses = true;
            console.log("action:success ", action);
        });
        // הוספת מקרה שהט'נק נכשל 
        builder.addCase(addTaskThunk.rejected, (state, action) => {
            //state.token=-2;
            console.log("action:failed ", action);
        });
        //gettask:
        // הוספת מקרה שהט'נק התחיל
        builder.addCase(gettasksThunk.pending, (state) => {
        });
        // הוספת מקרה שהט'נק הסתיים בהצלחה
        builder.addCase(gettasksThunk.fulfilled, (state, action) => {
            state.tasks = action.payload;
            console.log("action:success ", action);
        });
        // הוספת מקרה שהט'נק נכשל 
        builder.addCase(gettasksThunk.rejected, (state, action) => {
            console.log("action:failed ", action);
        });
        //edittask:
        // הוספת מקרה שהט'נק התחיל
        builder.addCase(editTaskThunk.pending, (state) => {
        });
        // הוספת מקרה שהט'נק הסתיים בהצלחה
        builder.addCase(editTaskThunk.fulfilled, (state, action) => {
            //   state.tasks = action.payload;
            console.log("action:success ", action);
        });
        // הוספת מקרה שהט'נק נכשל 
        builder.addCase(editTaskThunk.rejected, (state, action) => {
            console.log("action:failed ", action);
        });
        // //deletetask:
        // // הוספת מקרה שהט'נק הסתיים בהצלחה
        // builder.addCase(deletetaskThunk.fulfilled, (state, action) => {
        //     //   state.tasks = action.payload;
        //     console.log("action:success ", action);
        // });
        // // הוספת מקרה שהט'נק נכשל 
        // builder.addCase(deletetaskThunk.rejected, (state, action) => {
        //     console.log("action:failed ", action);
        // });
        // //searchtask:
      
        // // הוספת מקרה שהט'נק הסתיים בהצלחה
        // builder.addCase(searchtaskThunk.fulfilled, (state, action) => {
        //     state.searchtasks = action.payload;
        //     for (let i = 0; i < state.searchtasks.length; i++) {
        //            var d=new Date(state.searchtasks[i].date);
        //            state.searchtasks[i].date=d.toLocaleDateString();
                   
        //     }
          
        //     console.log("action:success ", action);
        // });
        // // הוספת מקרה שהט'נק נכשל 
        // builder.addCase(searchtaskThunk.rejected, (state, action) => {
        //     console.log("action:failed ", action);
        // });
    }
});

// export const { edittasks } = tasksSlice.actions;