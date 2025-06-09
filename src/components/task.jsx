
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addTaskThunk } from "../redux/slices/addTaskThunk";

export const Task = () => {
    const navigate = useNavigate();
    const refDialog = useRef();
    const dispatch = useDispatch();
    const token = useSelector(state => state.user.token);
    const Tasks = useSelector(state => state.tasks.tasks);
    const { day, month, year, taskId } = useParams();
    const [thisDay, setThisDay] = useState(new Date(year, month - 1, day))
    const [thisTask, setThisTask] = useState({})
    const [details, setDetails] = useState({
        name: thisTask ? thisTask.name : "",
        taskName: thisTask ? thisTask.taskName : "",
        date: thisTask ? thisTask.date : thisDay,
        time: thisTask ? thisTask.time : new Date().getTime(),
        description: thisTask.description ? thisTask.description : "   ",
        finish: thisTask.finish ? thisTask.finish : false
    });

    useEffect(() => {
        if (taskId) {
            let i = Tasks.find(x => x.id === taskId)
            setThisTask(i);
            let x = { "name": i.name, "date": i.date, "time": i.time, "description": i.description, "finish": i.finish }
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
    const saveTask = async () => {
        const Id = parseInt(token, 10); // Use base 10 for parsing
        if (isNaN(Id)) {
            console.error('Invalid Id:', token); // Log if it's not a valid number
        }
        else {
            let d = new Date(details.date)
            d = d.toLocaleDateString()
            setDetails({ ...details, date: d });
          dispatch(addTaskThunk({ details, Id })); // Pass as integer
        }
        refDialog.current.close();
        navigate(`../`)
    }

    const saveEditTask = async () => {
     //   dispatch(editTaskThunk({ details, token, Id }));
        refDialog.current.close();
        navigate(`../`)
    }
    const cancelTask = () => {
        refDialog.current.close();
        navigate(`../`)
    }
    return <dialog ref={refDialog}>
        {/* יצירת אירוע חדש */}
        <input type="text" placeholder="name" onChange={(e) => setDetails({ ...details, name: e.target.value })} />
          {!taskId && <div>
            <select name="taskName" id="taskName" className="styled-select" value={details.taskName} onChange={(e) => setDetails({ ...details, taskName: e.target.value })}>
                <option value=" בקשת המשך "> בקשת המשך   </option> 
                 <option value="סיכום אבחון "> סיכום אבחון  </option> 
                  <option value="סיכום טיפול ">    סיכום טיפול  </option> 
                   <option value=" דוח ביניים "> דוח ביניים  </option>
                   <option value=" שיחת הורים "> שיחת הורים  </option>
                   <option value="שיחה עם איש צוות "> שיחה עם איש צוות </option>
            </select>
            {/* במקרה שהארוע כבר הוגדר בתאריך מסוים */}
            {/* {day && <input type="text" value={`${day}/${month}/${year}`}/>} */}
            {!day && <input type="date"  onChange={(e) => setDetails({ ...details, date: e.target.value })} />}
            <input type="time" placeholder="Task time" onChange={(e) => setDetails({ ...details, time: e.target.value })} />
            <br />
            <textarea name="" id="" cols="30" rows="5" onChange={(e) => setDetails({ ...details, description: e.target.value })}></textarea>
            <br />
            <button onClick={() => saveTask()}>save </button>
            <button onClick={() => cancelTask()}>cancel</button>
        </div>}
        {/* עריכת אירוע קיים */}
        {taskId && <div>
            <input type="text" value={`${details.name}`} onChange={(e) => setDetails({ ...details, name: e.target.value })} />

            <input type="text" value={`${details.date}`} placeholder="Task date" />

            <input type="time" value={`${details.time}`} placeholder="Task time" onChange={(e) => setDetails({ ...details, time: e.target.value })} />
            <br />
            <textarea value={`${details.description}`} name="" id="" cols="30" rows="5" onChange={(e) => setDetails({ ...details, description: e.target.value })}></textarea>
            <br />
           <input type="checkbox" value={`${details.finish}`} />
            <button onClick={() => saveEditTask()}>save </button>
            <button onClick={() => cancelTask()}>cancel</button>
        </div>}
    </dialog>
}