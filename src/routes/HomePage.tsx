import Navbar from '../components/Navbar'
import Home from '../components/HomePage/Home'
import Announcements from '../components/HomePage/Announcements'
import Foundations from '../components/HomePage/Foundations'
import Footer from '../components/Footer'

export default function HomePage(){
    return (
        <>
          <Navbar active="home"/>
          <Home />
          <Announcements />
          <Foundations />
          <Footer/>
        </>
      )
}