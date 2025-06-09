import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  useNavigate } from "react-router-dom";
import { addUserThunk } from "../redux/slices/addUserThunk";

export const NewUser = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const username = useSelector(state => state.user.username);
    const password = useSelector(state => state.user.password);
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const token = useSelector(state => state.user.token);

    useEffect(() => {
        if (token !== -1) {
            navigate(-1);
            navigate(`calender`)
        }
    }, [token])

    return <div>
        <input type="text" value={username} onChange={d => { }} />
        <input type="text" value={password} onChange={d => { }} />
        <input type="text" onChange={(e) => setPhone(e.target.value)} />
        <input type="text" onChange={(e) => setEmail(e.target.value)} />
        <button onClick={async () => { await dispatch(addUserThunk({ username: username, password: password, phone: phone, email: email })) }}
        >logOn</button>
    </div>
}

