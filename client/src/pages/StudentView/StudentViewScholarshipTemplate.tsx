import { Outlet } from "react-router-dom";
import StudentViewTemplate from "./StudentViewTemplate";

export default function StudentViewScholarshipTemplate(){
    return(
        <StudentViewTemplate active="dashboard">
            <Outlet/>
        </StudentViewTemplate>
    )
}