import { Route, Routes } from "react-router-dom";
import { Calender } from "./calender";
import { Login } from "./login";
import { NewUser } from "./newUser";
import { Month } from "./month";
import { SearchMeeting } from "./searchMeeting";
import { NewPatient } from "./newPatient";
import { EditMeeting } from "./editMeeting";
import { Task } from "./task";

export const Routing = () => {
    return (
        <>
            <Routes>
                <Route path="/calender" element={<Calender />} />
                <Route path="/login" element={<Login />} />
                <Route path='/newUser' element={<NewUser />} />
                <Route path='/search' element={<SearchMeeting />} />
                <Route path='/newPatient' element={<NewPatient />} />
                <Route path='/newPatient/:day/:month/:year' element={<NewPatient />} />
                <Route path='/edit/:meetingId' element={<EditMeeting/>} />
                <Route path='/calender/newPatient' element={<NewPatient />} />
                <Route path='/calender/newPatient/:month/:day/:year' element={<NewPatient />} />
                <Route path='/calender/edit/:meetingId' element={<EditMeeting />} />
                <Route path='/calender/search' element={<SearchMeeting />} />
                <Route path="/" element={<Month />} />
                <Route path="/addTask" element={<Task />} />
                <Route path="/calender/addTask" element={<Task />} />
               
            </Routes>
        </>
    );
}