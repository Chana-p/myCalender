
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { editmeetingThunk } from "../redux/slices/editMeetingThunk";

export const EditMeeting = () => {
    const navigate = useNavigate();
    const refDialog = useRef();
    const dispatch = useDispatch();
    const token = useSelector(state => state.user.token);
    const meetings = useSelector(state => state.meetings.meetings);
    const { meetingId } = useParams();
    const [thismeeting, setThismeeting] = useState({});
    const [details, setDetails] = useState({ name: "", date: "", time: "", description: "", type: "", sumOfMeetings: "", paid: 0, reception: false });
const [paid,setPaid]=useState(false);
    useEffect(() => {
        const meeting = meetings.find(x => x.id === meetingId);
        setThismeeting(meeting);
        refDialog.current.showModal();
    }, []);

    useEffect(() => {
        if (thismeeting) {
            setDetails({
                name: thismeeting.name || "",
                date: new Date(thismeeting.date).toDateString() || new Date(),
                time: thismeeting.time || new Date().getTime(),
                type:(thismeeting.sumOfMeetings===1)?"טיפול יחיד":(thismeeting.sumOfMeetings>15)?"קבוע":"סדרה" ,
                number: thismeeting.number || 0,
                sumOfMeetings: thismeeting.sumOfMeetings || 1,
                description: thismeeting.description || "   ",
                paid: thismeeting.paid || 0,
                reception: thismeeting.reception || false
            });
        }
        if(thismeeting.paid>0){
            setPaid(true);
        }
    }, [thismeeting]);

    const saveEditmeeting = async () => {
        dispatch(editmeetingThunk({ details, token, meetingId }));
        refDialog.current.close();
        navigate(`../`);
    };

    const cancelmeeting = () => {
        refDialog.current.close();
        navigate(`../`);
    };

    return (
        <dialog ref={refDialog}>
            {/* עריכת אירוע קיים */}
             
                <div>
                    <input type="text" value={details.name} onChange={(e) => setDetails({ ...details, name: e.target.value })} />
                    <input type="text" value={details.date} readOnly placeholder="meeting date" />
                    <input type="time" value={details.time} placeholder="meeting time" onChange={(e) => setDetails({ ...details, time: e.target.value })} />
                    <br />
                    <textarea value={details.description} name="" id="" cols="30" rows="5" onChange={(e) => setDetails({ ...details, description: e.target.value })}></textarea>
                    <br />
                    <input className="smallInputs" type="number" value={details.sumOfMeetings} onChange={(e) => setDetails({ ...details, sumOfMeetings: e.target.value })} />
                    <label className="smallInputs">מספר פגישה</label>
                    <input className="smallInputs" type="number" value={details.number} onChange={(e) => setDetails({ ...details, number: e.target.value })} />
                    <label className="smallInputs">מספר פגישות סה"כ</label>
                    <br />
                    <input className="smallInputs" type="checkbox" checked={details.reception} onChange={(e) => setDetails({ ...details, reception: e.target.checked })} />
                    <label className="smallInputs">שולם</label>
                    <input className="smallInputs" type="checkbox" checked={details.paid>0} onChange={(e) => {setPaid(true);setDetails({ ...details, paid: 300 })}} />
                 {paid&&<input className="smallInputs" type="number" value={details.paid} onChange={(e) => setDetails({ ...details, paid: e.target.value })} />}
                    <label className="smallInputs">נשלחה קבלה</label>
                    <button onClick={() => saveEditmeeting()}>save</button>
                    <button onClick={() => cancelmeeting()}>cancel</button>
                </div>
            
        </dialog>
    );
};