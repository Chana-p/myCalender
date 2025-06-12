import { createAsyncThunk } from "@reduxjs/toolkit";

export const getmeetingsThunk = createAsyncThunk(
   'getmeetings', 
   async ({Id}) => {
      console.log(Id);
       
       const res = await fetch(`https://mycalenderbackend.onrender.com/meetings/${Id}`);
      

       if (res.ok) {
           const data = await res.json();
           console.log("fetch success get meetings");
           return data.meetings;
       } else {
           throw new Error('failed to fetch');
       }
   }
);
