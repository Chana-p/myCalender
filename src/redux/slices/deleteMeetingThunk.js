import { createAsyncThunk } from "@reduxjs/toolkit";

export const deletemeetingThunk = createAsyncThunk(
    'deletemeeting', 
    async ({ token, meetingId }) => {
        const res = await fetch(`http://localhost:1234/meeting/${token}/${meetingId}`, {
            method: 'DELETE',
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
