import Navbar from '../components/Navbar'
import Home from '../pages/HomePage/Home'
import Announcements from '../pages/HomePage/Announcements'
import Foundations from '../pages/HomePage/Foundations'
import Footer from '../components/Footer'

export default function HomePage(){
    return (
        <>
          <Home />
          <Announcements />
          <Foundations />
          <Footer/>
        </>
      )
}