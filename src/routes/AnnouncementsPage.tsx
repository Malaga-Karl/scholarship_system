import Navbar from "../components/Navbar"
import MainAnnouncements from "../components/AnnouncementsPage/MainAnnouncements"
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