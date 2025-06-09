
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addmeetingThunk } from "../redux/slices/addMeetingThunk";
import { editmeetingThunk } from "../redux/slices/editMeetingThunk";

export const Meeting = () => {
    const navigate = useNavigate();
    const refDialog = useRef();
    const dispatch = useDispatch();
    const token = useSelector(state => state.user.token);
    const meetings = useSelector(state => state.meetings.meetings);
    const { day, month, year, meetingId } = useParams();
    const [thisDay, setThisDay] = useState(new Date(year, month - 1, day))
    const [thismeeting, setThismeeting] = useState({})
    const [details, setDetails] = useState({
        name: thismeeting ? thismeeting.name : "",
        type: thismeeting ? thismeeting.type : "טיפול יחיד",
        number: thismeeting ? thismeeting.number : 0,
        sumOfMeetings: thismeeting ? thismeeting.sumOfMeetings : 0,
        time: thismeeting ? thismeeting.time : new Date().getTime(),
        description: thismeeting.description ? thismeeting.description : "   "
    });

    useEffect(() => {
        if (meetingId) {
            let i = meetings.find(x => x.id === meetingId)
            setThismeeting(i);
            let x = { "name": i.name, "date": i.date, "time": i.time, "description": i.description }
            setDetails(x);

        }
        if (day) {
          
            let s = `${year}-${month}-${day}`

            if (month < 10)
                s = `${year}-0${month}-${day}`
            if (day < 10)
                s = `${year}-${month}-0${day}`
            if (month < 10 && day < 10)
                s = `${year}-0${month}-0${day}`

            setDetails({ ...details, date: s })
        }
        refDialog.current.showModal();
    }, [])
    const savemeeting = async () => {
        const meetingId = parseInt(token, 10); // Use base 10 for parsing
        if (isNaN(meetingId)) {
            console.error('Invalid meetingId:', token); // Log if it's not a valid number
        }
        else {
            let d = new Date(details.date)
            d = d.toLocaleDateString()
            setDetails({ ...details, date: d });
            dispatch(addmeetingThunk({ details, meetingId })); // Pass as integer
        }
        refDialog.current.close();
        navigate(`../../calender`)
    }

    const saveEditmeeting = async () => {
        dispatch(editmeetingThunk({ details, token, meetingId }));
        refDialog.current.close();
        navigate(`../../calender`)
    }
    const cancelmeeting = () => {
        refDialog.current.close();
        navigate(`../../calender`)
    }
    return <dialog ref={refDialog}>
        {/* יצירת סדרה חדשה */}
        {!meetingId && <div>
            <input type="text" placeholder="meetingHeader" onChange={(e) => setDetails({ ...details, name: e.target.value })} />
            {/* במקרה שהארוע כבר הוגדר בתאריך מסוים */}
            {day && <input type="text" value={`${day}/${month}/${year}`} placeholder="meeting date" />}
            {!day && <input type="date" placeholder="meeting date" onChange={(e) => setDetails({ ...details, date: e.target.value })} />}
            <input type="time" placeholder="meeting time" onChange={(e) => setDetails({ ...details, time: e.target.value })} />
            <br />
            <textarea name="" id="" cols="30" rows="5" onChange={(e) => setDetails({ ...details, description: e.target.value })}></textarea>
            <br />
            <input type="number" placeholder="num of meeting" onChange={(e) => setDetails({ ...details, number: e.target.value })} />
            <br />
            <button onClick={() => savemeeting()}>save </button>
            <button onClick={() => cancelmeeting()}>cancel</button>
        </div>}
        {/* עריכת אירוע קיים */}
        {meetingId && <div>
            <input type="text" value={`${details.name}`} onChange={(e) => setDetails({ ...details, name: e.target.value })} />

            <input type="text" value={`${details.date}`} placeholder="meeting date" />

            <input type="time" value={`${details.time}`} placeholder="meeting time" onChange={(e) => setDetails({ ...details, time: e.target.value })} />
            <br />
            <textarea value={`${details.description}`} name="" id="" cols="30" rows="5" onChange={(e) => setDetails({ ...details, description: e.target.value })}></textarea>
            <br />
            <input type="number" value={`${details.number}`} placeholder="num of meeting" onChange={(e) => setDetails({ ...details, number: e.target.value })} />
            <br />
            <button onClick={() => saveEditmeeting()}>save </button>
            <button onClick={() => cancelmeeting()}>cancel</button>
        </div>}
    </dialog>
}