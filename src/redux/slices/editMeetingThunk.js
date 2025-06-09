import { createAsyncThunk } from "@reduxjs/toolkit";

export const editmeetingThunk = createAsyncThunk(
    'editmeeting', 
    async ({ details,token, meetingId }) => {
            console.log(details);
            
        const res = await fetch(`http://localhost:1234/meeting/${token}/${meetingId}`, {
            method: 'PUT',
            body: JSON.stringify(details),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (res.ok) {
            // const data = await res.json();
           
            // return data.meetingId; 
            console.log("fetch success");
        } else {
            throw new Error('failed to fetch');
        }
    }
);
