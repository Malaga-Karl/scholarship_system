//Component Imports
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

//Page Imports
import MainSignIn from '../pages/SignInPage/MainSignIn';

export default function SignInPage(){
    return(
        <>
            <Navbar active='signin'/>
            <MainSignIn/>
            <Footer/>
        </>
    );
}