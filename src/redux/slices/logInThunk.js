import { createAsyncThunk } from "@reduxjs/toolkit";

export const logInThunk = createAsyncThunk(
    'logIn', 
    async (details) => {
    const res = await fetch('http://https://mycalenderbackend.onrender.com/login', {
        method: 'POST',
        body: JSON.stringify(details),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    if (res.ok) {
        const data = await res.json();
        console.log("fetch");
        return data.token;
    }
    else {
        throw new Error('faild to fetch');
    }
    }
)
