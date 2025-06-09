

import { useEffect, useState } from "react"
import './calenderDesign.css';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logInThunk } from "../redux/slices/logInThunk";
import { editPassword, editUsername } from "../redux/slices/userSlice";
//import {לוח שנה.jpg} from "../../public/pic/לוח שנה.jpg"
export const Login = () => {
    const navigate = useNavigate();
    const token = useSelector(state => state.user.token);
    const failed = useSelector(state => state.user.failed);
    const dispatch = useDispatch();
    const [details, setDetails] = useState({ username: "", password: "" });
    const [newUser, setNewUser] = useState(false)
   
   
useEffect(()=>{
    if(token!==-1)
        navigate(`calender`)
 if(token===-1&&failed){
    setNewUser(true)
  navigate(`newUser`)}
},[failed,token])
    return <div>
        {!newUser &&
            <div  style={{ height: "90vh", backgroundImage: "linear-gradient(to right, rgba(0, 128, 0, 0.719),rgba(35, 103, 221, 0.771), rgba(76, 0, 130, 0.672), rgba(238, 130, 238, 0.781))" }}>
                <input className="logIn" style={{color:"black",fontSize:"x-large"}} type="text" onChange={(e) => setDetails({ ...details, username: e.target.value })} placeholder="your name" />
                <input className="logIn" type="text" onChange={(e) => setDetails({ ...details, password: e.target.value })} placeholder="your password" />
                <button className="logIn" onClick={async() => {
                 await dispatch(logInThunk(details));
                 await dispatch(editUsername(details.username))
                 await dispatch(editPassword(details.password))
                }}>login</button>
            </div>}
            

    </div>

}