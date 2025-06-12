 import { createAsyncThunk } from "@reduxjs/toolkit";

export const addTaskThunk = createAsyncThunk(
    'addTask', 
    async ({ details, Id }) => {
        console.log(details.date);
        const res = await fetch(`https://mycalenderbackend.onrender.com/task/${Id}`, {
            method: 'POST',
            body: JSON.stringify(details),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (res.ok) {
            const data = await res.json();
            console.log("add task success");
            return data.Id;
        } else {
            throw new Error('failed to add task');
        }
    }
);
