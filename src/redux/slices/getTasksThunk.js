import { createAsyncThunk } from "@reduxjs/toolkit";

export const gettasksThunk = createAsyncThunk(
   'gettasks', 
   async ({Id}) => {
      console.log(Id);
       
       const res = await fetch(`https://mycalenderbackend.onrender.com/tasks/${Id}`);
      

       if (res.ok) {
           const data = await res.json();
           console.log("fetch success get tasks");
           return data.tasks;
       } else {
           throw new Error('failed to fetch');
       }
   }
);
