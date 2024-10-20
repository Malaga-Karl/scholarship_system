import Navbar from "../components/Navbar"
import MainAnnouncements from "../pages/AnnouncementsPage/MainAnnouncements"
import Footer from "../components/Footer"

export default function AnnouncementsPage(){
    return(
        <>
            <Navbar active="announcements"/>
            <MainAnnouncements/>
            <Footer/>
        </>
    )
}