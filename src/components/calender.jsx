import { useEffect, useState } from 'react';
import './calenderDesign.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getmeetingsThunk } from '../redux/slices/getMeetingsThunk';
import { deletemeetingThunk } from '../redux/slices/deleteMeetingThunk';
import { HDate } from '@hebcal/core';
export const Calender = () => {
    const [menu, setMenu] = useState(false);
    const [menumeeting, setmenumeeting] = useState(false);
    const [x, setX] = useState();
    const [y, setY] = useState();
    const [meetingToEdit, setmeetingToEdit] = useState({});
    const [meetingToEditId, setmeetingToEditId] = useState("");
    const [week, setWeek] = useState([]);
    const [date, setDate] = useState(new Date())
    const [thisDay, setThisDay] = useState(new Date())
    const navigate = useNavigate();
    const token = useSelector(state => state.user.token);
    const meetings = useSelector(state => state.meetings.meetings);
    const dispatch = useDispatch()
    let s = new Date()
    const tasks = useSelector(state => state.tasks.tasks);    
    const [taskToEdit, setTaskToEdit] = useState({});
    const [taskToEditId, setTaskToEditId] = useState("");
    const rightClick = (e) => {
        setX(e.clientX);
        setY(e.clientY);
        setMenu(true);
        e.preventDefault();
    }
    const Click = (e) =>{
        setmenumeeting(false);
        setMenu(false);
    }
    useEffect(() => {
        myDate();
        getmeetingss();

        window.addEventListener('contextmenu', rightClick);
        window.addEventListener('click', Click);

        return () => {
            window.removeEventListener('contextmenu', rightClick)
            window.removeEventListener('click', Click)
        }
    }, [])
const getmeetingss =() =>{
    const meetingId = parseInt(token, 10);
    if (isNaN(meetingId)) {
        console.error('Invalid meetingId:', token); 
    } else {
        dispatch(getmeetingsThunk({ Id:meetingId })); 
    }
}
    const myDate = () => {
        let thisDay = date.getDay();
        const str = date.toDateString();
        let localWeek = [];
        let count = 0;
        for (let i = 0; i < thisDay; i++) {
            let ss = (date.getDate() - (thisDay - i));
            let newddd = new Date(str);
            newddd.setDate(ss);
            let newdstr = newddd.toDateString();
            localWeek.push(newdstr);
            setWeek(localWeek);

        }
        for (let i = thisDay; i < 7; i++) {
            const str = date.toDateString();
            let newddd = new Date(str);
            let ss = (date.getDate() + count);
            count++;
            newddd.setDate(ss);
            let newdstr = newddd.toDateString();
            localWeek.push(newdstr);
            setWeek(localWeek);
        }
    }
    const left = () => {
        const newdate = date;
        newdate.setDate(newdate.getDate() - 7)
        setDate(newdate);
        myDate();

    }
    const right = () => {
        const newdate = date;
        newdate.setDate(newdate.getDate() + 7)
        setDate(newdate);
        myDate();
    }
    const today = async () => {
        let todayy = new Date();
        setDate(todayy);
        myDate();
    }
    const   newPatient = () => {
        navigate(`newPatient`);
    }
    const   newPatientInDay = () => {
        let f = new Date(thisDay);
       
       const formatDate = (date) => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const year = date.getFullYear();
        
        return `${month}/${day}/${year}`;
    };
    f = formatDate(f);
    navigate(`  newPatient/${f}`);
    }

    const edit = ()=>{
        setmenumeeting(false);
        setMenu(false)
        
        navigate(`edit/${meetingToEdit.id}`)

    }
    const deletemeeting = async()=>{
        setmenumeeting(false);
        setMenu(false)
     await dispatch(deletemeetingThunk({token, meetingId:meetingToEditId }))
        getmeetingss();

    }
    const search =() =>{
        navigate(`search`);
    }
    const month =() =>{
        navigate(`../Month`);
    }
     const hebrewDate = (d) => {
            const today = new HDate(new Date(d));
            const formattedDate = today.renderGematriya();
            return formattedDate;
        }
    return <div className="aba" >

        {menu && <div
            style={{ position: "absolute", top: y, left: x, backgroundColor: "teal",fontSize:"5px" }}>
            <button className='menuButton' onClick={() =>   newPatientInDay()}>New meeting</button>
            <br />
            <button className='menuButton' onClick={() => today()}>Go to Today</button>
        </div>}
        {menumeeting && <div
            style={{ position: "absolute", top: y, left: x, backgroundColor: "teal" }}>
            <button className='menuButton' onClick={()=>edit()}>Edit</button>
            <br />
            <button className='menuButton' onClick={()=>deletemeeting()}>Delete</button>
        </div>}
        <div className="buttons"  >
            <div></div>
            <button onClick={() =>   newPatient()} >New meeting</button>
            <button onClick={() => today()}>Go to Today</button>
            <button onClick={() => left()}>◀</button>
            <button onClick={() => right()}>▶</button>
            <button onClick={()=>search()}>Search meeting</button>
            <button onClick={()=>month()}>Month Calender</button>
        </div>
        <table >
            <thead>
                <tr>
                    {week.map((d) => <th>{d}
                        <br />
                        {hebrewDate(d)}
                    </th>)}
                </tr></thead>
            <tbody  >
                <tr className='trr'>
                    {week.map((d) => <td onContextMenu={() => setThisDay(d)} className={d === s.toDateString() ? "today" : "notToday"}>

                        {meetings && <>
                            {meetings.filter(e => new Date(e.date).toDateString() === d).map(g => <div className='meetingOnDay' onContextMenu={()=>{
                                setmeetingToEdit(g);
                                setmeetingToEditId(g.id);
                                setmenumeeting(true);
                            }}>
                                {g.time}
                                <br />
                               {g.number}/{g.sumOfMeetings} {g.name}
                            </div>
 )}</>}
       {tasks && <>
                            {tasks.filter(e => new Date(e.date).toDateString() === d).map(g => <div className='taskOnDay' onContextMenu={()=>{
                                setTaskToEdit(g);
                                setTaskToEditId(g.id);
                                setmenumeeting(true);
                            }}>
                               {(g.finished) && <span>✔</span>} {g.name}-{g.taskName} 
                            </div>
 )}</>}
                    </td>)}
                </tr>
            </tbody>
        </table>
    </div >
}