import { Route, Routes } from "react-router-dom";
import { Calender } from "./calender";
import { Login } from "./login";
import { NewUser } from "./newUser";
import { Month } from "./month";
import { SearchMeeting } from "./searchMeeting";
import { NewPatient } from "./newPatient";
import { EditMeeting } from "./editMeeting";
import { Task } from "./task";
import Welcome from "./Welcome";
import WelcomeWrapper from "./WelcomeWrapper";

export const Routing = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<WelcomeWrapper />} />
                <Route path="/calender" element={<Calender />} />
                <Route path="/login" element={<Login />} />
                <Route path='/newUser' element={<NewUser />} />
                <Route path='/search' element={<SearchMeeting />} />
                <Route path='/calender/newPatient' element={<NewPatient />} />
                <Route path='/calender/newPatient/:month/:day/:year' element={<NewPatient />} />
                <Route path='/calender/edit/:meetingId' element={<EditMeeting />} />
                <Route path='/calender/search' element={<SearchMeeting />} />
                <Route path="/calender/addTask" element={<Task />} />
                <Route path="/Month" element={<Month />} />
               <Route path='/Month/newPatient' element={<NewPatient />} />
                <Route path='/Month/newPatient/:month/:day/:year' element={<NewPatient />} />
                <Route path='/Month/edit/:meetingId' element={<EditMeeting />} />
                <Route path='/Month/search' element={<SearchMeeting />} />
                <Route path="/Month/addTask" element={<Task />} />
            </Routes>
        </>
    );
}