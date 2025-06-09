import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchmeetingThunk } from "../redux/slices/searchMeetingThunk";
import { useNavigate } from "react-router-dom";

export const SearchMeeting = () => {

    const navigate = useNavigate();

    const [text, setText] = useState("");

    const [change, setChange] = useState(false);
    const [date, setDate] = useState(new Date());
    const token = useSelector(state => state.user.token);
    const searchmeetings = useSelector(state => state.meetings.searchmeetings);

    const dispatch = useDispatch()
const ret = () =>{
    navigate(`../../calender`)
}


    return <div>
        <button onClick={()=>ret()} style={{width:"5%",height:"5vh",fontSize:"large",textAlign:"center",padding:"0%"}}>x</button>
        <br />
        <input type="text" placeholder="name or description" onChange={(e) => setText(e.target.value)} />
        <input type="date" onChange={(e) => {
            setDate(e.target.value);
            setChange(true);
        }} />
        {/* <input type="text" placeholder="description" onChange={(e)=>setDescription(e.target.value)}/> */}

        <button onClick={() => {
            if (change) {
                //var a = date.toLocaleDateString();
                dispatch(searchmeetingThunk({ token: parseInt(token), date, text: text }));
            }
            else {
                dispatch(searchmeetingThunk({ token: parseInt(token), date: null, text: text }));
            }
        }
        } >search</button>
        <div>
            {searchmeetings && <>
                {searchmeetings.map(g => <div className='meetingOnDay' >
                    {g.name && <div>
                    {g.date}     {g.time}          
                        <br />
                        {g.name}  {g.description}</div>}
                </div>
                )}</>}
                {!searchmeetings[0] && <div>
                   לא נמצאו תוצאות מתאימות לחיפוש שלך 😒😒
                    </div>}
        </div>
        
    </div>

}