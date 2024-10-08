import './App.css'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Announcements from './components/Announcements'
import ParteredFoundation from './components/ParteredFoundation'
import Footer from './components/Footer'

function App() {

  return (
    <>
      <Navbar/>
      <Home id="home"/>
      <Announcements id="announce"/>
      <ParteredFoundation />
      <Footer/>
    </>
  )
}

export default App
