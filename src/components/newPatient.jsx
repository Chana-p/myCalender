
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addmeetingThunk } from "../redux/slices/addMeetingThunk";
import { editmeetingThunk } from "../redux/slices/editMeetingThunk";

export const NewPatient = () => {
    const navigate = useNavigate();
    const refDialog = useRef();
    const dispatch = useDispatch();
    const token = useSelector(state => state.user.token);
    const meetings = useSelector(state => state.meetings.meetings);
    const { day, month, year} = useParams();
    const [thisDay, setThisDay] = useState(new Date(year, month - 1, day))
    const [thismeeting, setThismeeting] = useState({})
    const [details, setDetails] = useState({ name: "", date: "", time: "", description: "", type: "", sumOfMeetings: "" });

    useEffect(() => {
    
setDetails({
        name: thismeeting ? thismeeting.name : "",
        date: thismeeting ? thismeeting.date : thisDay,
        time: thismeeting ? thismeeting.time : new Date().getTime(),
        type: thismeeting ? thismeeting.type : "טיפול יחיד",
        number: thismeeting ? thismeeting.number : 0,
        sumOfMeetings: thismeeting ? thismeeting.sumOfMeetings : 1,
        description: thismeeting.description ? thismeeting.description : "   "})

        if (day) {
          
            let s = `${year}-${month}-${day}`

            // if (month < 10)
            //     s = `${year}-0${month}-${day}`
            // if (day < 10)
            //     s = `${year}-${month}-0${day}`
            // if (month < 10 && day < 10)
            //     s = `${year}-0${month}-0${day}`

            setDetails({ ...details, date: s })
        }
        refDialog.current.showModal();
    }, [])
    const savemeeting = async () => {
        const Id = parseInt(token, 10); // Use base 10 for parsing
        if (isNaN(Id)) {
            console.error('Invalid Id:', token); // Log if it's not a valid number
        }
        else {
            let d = new Date(details.date)
            d = d.toLocaleDateString()
            setDetails({ ...details, date: d });
            dispatch(addmeetingThunk({ details, Id })); // Pass as integer
        }
        refDialog.current.close();
        navigate(`../`)
    }

    // const saveEditmeeting = async () => {
    //     dispatch(editmeetingThunk({ details, token, meetingId }));
    //     refDialog.current.close();
    //     navigate(`../../calender`)
    // }
    const cancelmeeting = () => {
        refDialog.current.close();
        navigate(`../`)
    }
    return <dialog ref={refDialog} className="centered-dialog">
        {/* רישום מטופל חדש */}
        <div>
            <input type="text" placeholder="name" onChange={(e) => setDetails({ ...details, name: e.target.value })} />
            {/* במקרה שהארוע כבר הוגדר בתאריך מסוים */}
            {day && <input type="text" value={`${day}/${month}/${year}`} />}
            {!day && <input type="date" onChange={(e) => setDetails({ ...details, date: e.target.value })} />}
            <input type="time" placeholder="meeting time" onChange={(e) => setDetails({ ...details, time: e.target.value })} />
            <br />
            <textarea name="" id="" placeholder="details" cols="30" rows="5" onChange={(e) => setDetails({ ...details, description: e.target.value })}></textarea>
            <br />
            {/* <input type="text" placeholder="type" onChange={(e) => setDetails({ ...details, type: e.target.value })} /> */}
            <select className="styled-select" value={details.type} onChange={(e) => setDetails({...details,type:e.target.value})}>
            <option value="" disabled>Select an option</option>
            <option value="טיפול יחיד">טיפול יחיד</option>
            <option value="סדרה">סדרה</option>
            <option value="קבוע">קבוע</option>
        </select>
        <br />
            {details.type==="סדרה"&&<input style={{"height":"10px"}} type="number" placeholder="sumOfMeetings" onChange={(e) => setDetails({ ...details, sumOfMeetings: e.target.value })} />}
            <button className="dialogButton" onClick={() => savemeeting()}>save </button>
            <button className="dialogButton"  onClick={() => cancelmeeting()}>cancel</button>
        </div>
        {/* עריכת אירוע קיים
        {meetingId && <div>
            <input type="text" value={`${details.name}`} onChange={(e) => setDetails({ ...details, name: e.target.value })} />

            <input type="text" value={`${details.date}`} placeholder="meeting date" />

            <input type="time" value={`${details.time}`} placeholder="meeting time" onChange={(e) => setDetails({ ...details, time: e.target.value })} />
            <br />
            <textarea value={`${details.description}`} name="" id="" cols="30" rows="5" onChange={(e) => setDetails({ ...details, description: e.target.value })}></textarea>
            <br />
            <button onClick={() => saveEditmeeting()}>save </button>
            <button onClick={() => cancelmeeting()}>cancel</button>
        </div>} */}
    </dialog>
}