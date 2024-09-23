import './App.css'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Announcements from './components/Announcements'
import ParteredFoundation from './components/ParteredFoundation'
import Prefooter  from './components/Prefooter'
import Footer from './components/Footer'

function App() {

  return (
    <>
      <Navbar />
      <Home />
      <Announcements />
      <ParteredFoundation />
      <Prefooter/>
      <Footer/>
    </>
  )
}

export default App
