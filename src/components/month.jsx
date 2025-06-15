import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getmeetingsThunk } from "../redux/slices/getMeetingsThunk";
import { deletemeetingThunk } from "../redux/slices/deleteMeetingThunk";
import { HDate } from "@hebcal/core";
import { gettasksThunk } from "../redux/slices/getTasksThunk";
export const Month = () => {

    const dayOfWeek = ["sunday", "monday", "tuesday", "wedensday", "thursday", "friday", "shabbat"];
    const [menu, setMenu] = useState(false);
    const [menumeeting, setmenumeeting] = useState(false);
    const [x, setX] = useState();
    const [y, setY] = useState();
    const [meetingToEdit, setmeetingToEdit] = useState({});
    const [meetingToEditId, setmeetingToEditId] = useState("");
    const [taskToEdit, setTaskToEdit] = useState({});
    const [taskToEditId, setTaskToEditId] = useState("");
    const [month, setMonth] = useState([]);
    const [date, setDate] = useState(new Date())
    const [thisDay, setThisDay] = useState(new Date())
    const navigate = useNavigate();
    const token = useSelector(state => state.user.token);
    const meetings = useSelector(state => state.meetings.meetings);
    const tasks = useSelector(state => state.tasks.tasks);
    const dispatch = useDispatch();
    const options = { month: 'long' }; // פורמט של שם החודש
    const monthName = date.toLocaleString('English', options); // שם החודש 
    const rightClick = (e) => {
        setX(e.clientX);
        setY(e.clientY);
        setMenu(true);
        e.preventDefault();
    }

    const Click = (e) => {
        setmenumeeting(false);
        setMenu(false);
    }
    useEffect(() => {
        myDate();

    }, [date])
    useEffect(() => {
        myDate();
        getmeetingss();
        getTasks();
        console.log("tasks");
        console.log(tasks);

        window.addEventListener('contextmenu', rightClick);
        window.addEventListener('click', Click);

        return () => {
            window.removeEventListener('contextmenu', rightClick)
            window.removeEventListener('click', Click)
        }
    }, [])
    const getmeetingss = () => {
        const meetingId = parseInt(token, 10);
        if (isNaN(meetingId)) {
            console.error('Invalid meetingId:', token);
        } else {
            dispatch(getmeetingsThunk({ Id: meetingId }));
        }
    }
    const getTasks = () => {
        const Id = parseInt(token, 10);
        if (isNaN(Id)) {
            console.error('Invalid Id:', token);
        } else {
            dispatch(gettasksThunk({ Id }));
        }
    }
    const myDate = () => {
        let thisDay = date.getDate();
        const str = date.toDateString();
        let localMonth = [];
        let fromSundayBeforeMonth = 8 - (Math.abs(date.getDate() - date.getDay())) % 7;


        if (date.getDate() < 7) {
            fromSundayBeforeMonth = (date.getDay() - date.getDate() + 1);
            if (date.getDay() < date.getDate()) {
                fromSundayBeforeMonth = 8 - (date.getDate() - date.getDay());
            }
        }
        console.log("fromSundayBeforeMonth");
        console.log(fromSundayBeforeMonth);
        let firstOnCalender = 1 + (date.getDate()) - (thisDay + fromSundayBeforeMonth);
        let endOfCalender = 7;
        //תחילת השבוע שלפני החודש הנוכחי 
        if (fromSundayBeforeMonth < 7) {
            for (let i = 0; i < fromSundayBeforeMonth; i++) {
                let ss = (firstOnCalender + i);
                let newddd = new Date(str);
                newddd.setDate(ss);
                let newdstr = newddd.toDateString();
                localMonth.push(newdstr);
                setMonth(localMonth);

            }
        }
        //מתחילת החודש הנוכחי עד היום/היום האחרון של החודש

        for (let i = 0; i < thisDay; i++) {
            let ss = (date.getDate() - (thisDay - i) + 1);
            let newddd = new Date(str);
            newddd.setDate(ss);
            let newdstr = newddd.toDateString();
            localMonth.push(newdstr);
            setMonth(localMonth);

        }
        let ss = new Date(date - 1);

        //מהיום הנוכחי עד סיום החודש במקרה שמדובר בחודש הנוכחי בלבד
        if (ss.getDate !== thisDay) {
            while (date.getMonth() === ss.getMonth()) {
                ss.setDate(ss.getDate() + 1);
                var string = ss.toDateString();
                localMonth.push(string);
                setMonth(localMonth);

            }
        }
        ss = new Date(localMonth.pop());
        //כדי להגיע ליום הראשון של החודש הבא
        ss.setDate(ss.getDate() - 1);

        //סיום השבוע בו מסתיים החודש הנוכחי
        for (let i = 0; i < endOfCalender; i++) {
            if (ss.getDay() <= 5) {
                ss.setDate(ss.getDate() + 1);
                var stri = ss.toDateString();
                localMonth.push(stri);
                setMonth(localMonth);
            }
        }

    }
    const left = () => {
        date.setDate(1);
        date.setMonth(date.getMonth() - 1);
        myDate();
    }
    const right = () => {
        date.setDate(1);
        date.setMonth(date.getMonth() + 1);
        myDate();

    }
    const today = async () => {
        let todayy = new Date();
        setDate(todayy);
        myDate();
    }
    const newPatient = () => {
        navigate(`newPatient`);
    }
    const newTask = () => {
        navigate(`addTask`);
    }
    const newPatientInDay = () => {
        let f = new Date(thisDay);
        const formatDate = (date) => {
            const day = String(date.getDate()).padStart(2, '0');
            const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
            const year = date.getFullYear();

            return `${month}/${day}/${year}`;
        };
        f = formatDate(f);
        navigate(`newPatient/${f}`);
    }

    const edit = () => {
        setmenumeeting(false);
        setMenu(false)
        navigate(`/edit/${meetingToEdit.id}`)
    }
    const deletemeeting = async () => {
        setmenumeeting(false);
        setMenu(false)
        await dispatch(deletemeetingThunk({ token, meetingId: meetingToEditId }))
        getmeetingss();
    }
    const toWeekCalender = () => {
        navigate(`/calender`);
    }
    const search = () => {
        navigate(`search`);
    }
    const hebrewDate = (d) => {
        const today = new HDate(new Date(d));
        const formattedDate = today.renderGematriya();
        return formattedDate;
    }
    return <div className="aba" >

        {menu && <div
            style={{ position: "absolute", top: y, left: x, backgroundColor: "teal", fontSize: "5px" }}>
            <button className='menuButton' onClick={() => newPatientInDay()}>New meeting</button>
            <br />
            <button className='menuButton' onClick={() => today()}>Go to Today</button>
        </div>}
        {menumeeting && <div
            style={{ position: "absolute", top: y, left: x, backgroundColor: "teal" }}>
            <button className='menuButton' onClick={() => edit()}>Edit</button>
            <br />
            <button className='menuButton' onClick={() => deletemeeting()}>Delete</button>
        </div>}
        <div className="buttons"  >
            <div></div>
            <button onClick={() => newPatient()} >New meeting</button>
            <button onClick={() => newTask()} >new task</button>
            <button onClick={() => today()}>Go to Today</button>
            <button style={{ width: "20px" }} onClick={() => right()}>▶</button>
            <button style={{ width: "20px" }} onClick={() => left()}>◀</button>
            <button onClick={() => search()}>Search meeting</button>
            <button onClick={() => toWeekCalender()}>Week Calender</button>
        </div>
        <h1> {monthName}</h1>
        <table style={{ width: "100%" }} >
            <thead>
                <tr style={{
                    display: "flex",
                    flexWrap: " wrap",
                }} >
                    {dayOfWeek.map((d, index) => <th key={index} style={{
                        height: "4vh",
                        width: "14%",
                        fontSize: "15px",
                        margin: "0.12%"
                    }}>{d}</th>)}
                </tr></thead>
            <tbody className="month">
                <tr className='trr' style={{
                    display: "flex",
                    flexWrap: " wrap"
                }} >
                    {month.map((d, index) => <td key={index} onContextMenu={() => setThisDay(d)} className={`${d === (new Date()).toDateString() ? "today" : "notToday"} ${"dayOfMonth"}`}  >
                        {d}
                        <br />
                        {hebrewDate(d)}
                        {meetings && meetings.filter(e => new Date(e.date).toDateString() === d)
                            .map((g, meetingIndex) => <div key={meetingIndex} className='meetingOnMonthDay' onContextMenu={() => {
                                setmeetingToEdit(g);
                                setmeetingToEditId(g.id);
                                setmenumeeting(true);
                            }}>
                                {g.number}/{g.sumOfMeetings} {g.name}  {g.time}
                            </div>)

                            }
                        {tasks && tasks.filter(e => new Date(e.date).toDateString() === d)
                            .map((g, taskIndex) => <div key={taskIndex} className='taskOnMonthDay' onContextMenu={() => {
                                setTaskToEdit(g);
                                setTaskToEditId(g.id);
                                setmenumeeting(true);
                            }}>
                                {(g.finished) && <span>✔</span>} {g.name}-{g.taskName}
                            </div>

                            )}
                    </td>)}
                </tr>
            </tbody>
        </table>
    </div>
}