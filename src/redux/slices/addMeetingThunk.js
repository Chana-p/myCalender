 import { createAsyncThunk } from "@reduxjs/toolkit";

export const addmeetingThunk = createAsyncThunk(
    'addmeeting', 
    async ({ details, Id }) => {
        console.log(details.date);
        const res = await fetch(`http://localhost:1234/meeting/${Id}`, {
            method: 'POST',
            body: JSON.stringify(details),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (res.ok) {
            const data = await res.json();
            console.log("fetch success");
            return data.Id;
        } else {
            throw new Error('failed to fetch');
        }
    }
);
