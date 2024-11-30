import { useState } from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

export default function HomeTemplate(){
    
    type ActiveType = "home" | "announcements" | "partners" | "signin"
    const [active, setActive] = useState<ActiveType>('home')
    return(
        <>
            <Navbar active={active} setActive={setActive}/>
            <Outlet/>
        </>
    )
}