import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MainPartners from "../pages/PartnersPage/MainParters";

export default function PartnersPage(){
    return(
        <>
            <Navbar active="partners"/>
            <MainPartners/>
            <Footer/>
        </>
    )
}