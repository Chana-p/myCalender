import { createAsyncThunk } from "@reduxjs/toolkit";

export const searchmeetingThunk = createAsyncThunk(
   'searchmeeting', 
   async ({token,date,text }) => {
      console.log("token"+token+"date"+date+"text"+text);
       
       const res = await fetch(`https://mycalenderbackend.onrender.com/meeting/${token}/search?date=${date}&text=${text}`);

       if (res.ok) {
           const data = await res.json();
           console.log("fetch success search meeting");
           return data.meetings;
       } else {
           throw new Error('failed to fetch');
       }
   }
);
