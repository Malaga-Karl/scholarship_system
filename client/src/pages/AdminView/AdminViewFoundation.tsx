import { Outlet } from "react-router-dom";
import AdminTemplate from "./AdminTemplate";

export default function AdminViewFoundation(){
    return(
        <AdminTemplate active="foundations">
            {/* <h1>Foundation</h1> */}
            <Outlet />
        </AdminTemplate>
    )
}